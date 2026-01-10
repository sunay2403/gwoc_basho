import { auth } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * Always returns a valid HeadersInit object
 * (no union types, no undefined values)
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true);
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export const getCart = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/`, {
    headers,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json(); // ✅ returns JSON
};

export const addToCart = async (productId: number, quantity = 1) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/items/`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ product: productId, quantity }),
  });

  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json(); // ✅ returns JSON
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/items/${itemId}/`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) throw new Error("Failed to update cart item");
  return true; // ✅ no JSON body
};

export const removeCartItem = async (itemId: number) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/items/${itemId}/remove/`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to remove cart item");
  return true; // ✅ no JSON body
};

export const clearCart = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/clear/`, {
    method: "POST",
    headers,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to clear cart");
  return true; // ✅ no JSON body
};
