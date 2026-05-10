import { supabase } from "./supabase";

export async function getSounds() {
  const { data, error } = await supabase
    .from("sounds")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}