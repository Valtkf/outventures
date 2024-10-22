import { gql, GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

// Variables d'environnement avec typage
const storefrontAccessToken = process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN;
const endpoint = process.env.NEXT_PUBLIC_SHOP_URL;

console.log("Shop URL:", endpoint);
console.log("Storefront Access Token:", storefrontAccessToken);
if (!endpoint || !storefrontAccessToken) {
  throw new Error("Missing environment variables. Check .env.local file.");
}
// Initialisation du client GraphQL
const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    altText: string;
    url: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { query, variables } = req.body;

    try {
      const data = await client.request(query, variables);
      res.status(200).json(data);
    } catch (error: unknown) {
      // Spécification du type unknown ici
      if (error instanceof Error) {
        res.status(500).json({ error: error.message }); // Utilisation de error.message
      } else {
        res.status(500).json({ error: String(error) }); // Conversion en string si ce n'est pas une erreur
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Types pour les produits et autres réponses de Shopify
interface Product {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    altText: string;
    url: string;
  };
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
  };
}

interface Cart {
  id: string;
  createdAt: string;
  updatedAt: string;
  lines: CartLine[];
  estimatedCost: {
    totalAmount: {
      amount: string;
    };
  };
}

// interface GetProductsResponse {
//   products: {
//     edges: {
//       node: Product;
//     }[];
//   };
// }
// Fonction pour récupérer les produits
// Fonction pour récupérer les produits via l'API route
export async function getProducts(): Promise<Product[]> {
  const query = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  `;

  try {
    // Faire une requête POST à l'API route
    const response = await fetch("/api/shopify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch products");
    }

    return data.products.edges.map((edge: { node: ProductNode }) => edge.node);
  } catch (error) {
    throw new Error(
      `Error fetching products: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// Fonction pour récupérer un produit par son ID
export const getProduct = async (id: string): Promise<Product> => {
  const query = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
  const variables = { id };

  try {
    // Définir un type explicite pour la réponse attendue
    const data = await client.request<{ product: Product }>(query, variables);
    return data.product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching product with ID ${id}: ${error.message}`);
    } else {
      throw new Error(`Error fetching product with ID ${id}: ${String(error)}`);
    }
  }
};

// Fonction pour ajouter un article au panier
export async function addToCart(
  itemId: string,
  quantity: number
): Promise<string> {
  const mutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity.toString(), 10),
          merchandiseId: itemId,
        },
      ],
    },
  };

  try {
    // Faire la requête POST vers l'API route
    const response = await fetch("/api/shopify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add item to cart");
    }

    return data.cart.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error adding item to cart: ${error.message}`);
    } else {
      throw new Error(`Error adding item to cart: ${String(error)}`);
    }
  }
}

// Fonction pour mettre à jour le panier
export async function updateCart(
  cartId: string,
  itemId: string,
  quantity: number
): Promise<string> {
  const mutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [
      {
        quantity: parseInt(quantity.toString(), 10),
        merchandiseId: itemId,
      },
    ],
  };

  try {
    const data = await client.request<{ cart: { id: string } }>(
      mutation,
      variables
    );
    return data.cart.id;
  } catch (error: unknown) {
    throw new Error(
      `Error updating cart: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// Fonction pour récupérer les détails d'un panier
export async function retrieveCart(cartId: string): Promise<Cart> {
  const query = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = { cartId };

  try {
    // Explicitly typing the response
    const data = await client.request<{ cart: Cart }>(query, variables);
    return data.cart;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error retrieving cart with ID ${cartId}: ${error.message}`
      );
    } else {
      throw new Error(
        `Error retrieving cart with ID ${cartId}: ${String(error)}`
      );
    }
  }
}

// Fonction pour obtenir l'URL de checkout d'un panier
export const getCheckoutUrl = async (cartId: string): Promise<string> => {
  const query = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = { cartId };

  try {
    const data = await client.request<{ cart: { checkoutUrl: string } }>(
      query,
      variables
    );
    return data.cart.checkoutUrl;
  } catch (error: unknown) {
    throw new Error(
      `Error getting checkout URL for cart ${cartId}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
