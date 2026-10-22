export interface Image {
  url: string;
}

export interface ProductImage {
  _id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  color: string[];
  rating_count: number;
  images: Image[];
  description: string;
}

export interface ProductMeta {
  color: string[];
  size: string[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductFilter {
  color: string[];
  size: string[];
  minPrice: string | null;
  maxPrice: string | null;
  keyword: string;
  category: string;
}
