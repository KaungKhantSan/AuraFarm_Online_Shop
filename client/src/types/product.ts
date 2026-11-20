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
  instock_count: number;
  rating_count: number;
  images: Image[];
  description: string;
  createdAt: string | Date;
  is_new_arrival: boolean;
  is_feature: boolean;
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
