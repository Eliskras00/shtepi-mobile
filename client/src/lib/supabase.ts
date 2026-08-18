import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: number;

  // Albanian content
  name: string;
  material: string;
  description: string;
  tag: string;

  // English content
  name_en?: string | null;
  material_en?: string | null;
  description_en?: string | null;
  tag_en?: string | null;

  category: string;
  price: number | null;
  image: string;
  images: string[] | null;
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
