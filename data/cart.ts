"use server";

import { createClient } from "@/utils/supabase/server";
import { getSessionUser } from "./sessionUser";
import { getProductById } from "./product";

const supabase = createClient();

export const getCartItems = async () => {
  const user = await getSessionUser();
  const userId = Array.isArray(user) ? user[0]?.id : user?.id;
  const products = [];

  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("userid", userId);

  return data;
};
