import { gql, GraphQLClient } from "graphql-request";

// Variables d'environnement avec typage
const storefrontAccessToken = process.env.STOREFRONTACCESSTOKEN!;
const endpoint = process.env.SHOPURL!;

console.log("Shop URL:", endpoint);
console.log("Storefront Access Token:", storefrontAccessToken);
// Initialisation du client GraphQL
const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});

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

interface GetProductsResponse {
  products: {
    edges: {
      node: Product;
    }[];
  };
}
// Fonction pour récupérer les produits
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
    // Utiliser le type de la réponse ici
    const data = await client.request<GetProductsResponse>(query);
    return data.products.edges.map((edge) => edge.node);
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

    // Assertion de type pour dire que `data` correspond à ce que l'on attend
    return data.product;
  } catch (error) {
    throw new Error(
      `Error fetching product with ID ${id}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
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
    const data = await client.request<{ cart: { id: string } }>(
      mutation,
      variables
    );
    return data.cart.id;
  } catch (error: unknown) {
    throw new Error(
      `Error adding item to cart: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
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
  } catch (error) {
    throw new Error(
      `Error retrieving cart with ID ${cartId}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
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
