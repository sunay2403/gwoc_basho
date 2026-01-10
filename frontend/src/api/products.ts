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

/* ------------------ Helpers ------------------ */

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include", // SAFE even for public APIs
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }

  return res.json();
}

/* ------------------ APIs ------------------ */

export const getCategories = (): Promise<Category[]> => {
  return safeFetch(`${API_BASE}/api/products/categories/`);
};

export const getProducts = (): Promise<Product[]> => {
  return safeFetch(`${API_BASE}/api/products/`);
};

export const getProductBySlug = (slug: string): Promise<Product> => {
  return safeFetch(`${API_BASE}/api/products/${slug}/`);
};
