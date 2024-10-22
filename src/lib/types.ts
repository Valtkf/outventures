// lib/types.ts
export interface Product {
  id: string;
  title: string;
  priceRange: {
    minVariantPrice: {
      amount: string; // Utilise 'string' ou 'number' selon ce que retourne ton API
      currencyCode?: string;
    };
  };
  featuredImage: {
    altText: string;
    url: string;
  };
}
