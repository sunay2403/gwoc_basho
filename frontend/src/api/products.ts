const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  image: string;
  alt_text: string;
  is_primary: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  stock: number;
  is_limited: boolean;
  is_featured: boolean;
  category: Category;
  images: ProductImage[];
}


export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE}/api/products/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/api/products/`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const res = await fetch(`${API_BASE}/api/products/${slug}/`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
