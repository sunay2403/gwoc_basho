const API_BASE = import.meta.env.VITE_API_BASE_URL;

export type Exhibition = {
  id: number;
  title: string;
  description?: string;
  date: string;
  image?: string;
};

export type ExhibitionResponse = {
  upcoming: Exhibition[];
  past: Exhibition[];
};

export async function fetchExhibitions(): Promise<ExhibitionResponse> {
  const res = await fetch(`${API_BASE}/api/exhibition/`);
  if (!res.ok)  throw new Error(`Failed to fetch exhibitions (${res.status})`);
  
  const data: ExhibitionResponse = await res.json();
  return data;
}
