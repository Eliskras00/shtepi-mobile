import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: number;
  name: string;
  category: string;
  material: string;
  price: number | null;
  description: string;
  image: string;
  images: string[] | null;
  tag: string;
  featured: boolean;
  created_at?: string;
}
export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  span: string;
  sort_order: number;
  created_at?: string;
};