import { auth } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken(true);
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export const getCart = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/`, { headers });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

export const addToCart = async (productId: number, quantity = 1) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/items/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ product: productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

export const updateCartItem = async (itemId: number, quantity: number) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/items/${itemId}/`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res;
};

export const removeCartItem = async (itemId: number) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/items/${itemId}/remove/`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return res;
};

export const clearCart = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/api/cart/clear/`, {
    method: "POST",
    headers,
  });
  if (!res.ok) throw new Error("Failed to clear cart");
  return res;
};
