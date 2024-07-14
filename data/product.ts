"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const getCategoryById = async (id: number) => {
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("id", id);

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return data;
};

export const getAllProducts = async () => {
  const { data, error } = await supabase.from("product").select("*");

  return data;
};

export const getProductById = async (id: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id);

  return data;
};

export const getProductsByCategory = async (categoryid: number) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("categoryid", categoryid);

  return data;
};

export const getProductsBySearch = async (search: string | undefined) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .ilike("name", `%${search}%`);

  return data;
};
