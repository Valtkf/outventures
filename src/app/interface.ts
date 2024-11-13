export interface simplifiledProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  sportcategoryName: string;
  subcategoryName: string;
  name: string;
}

export interface SanityImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface fullProduct {
  _id: string;
  images: SanityImage[];
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
}
