"use server";

import { getSessionUser } from "@/data/sessionUser";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const addToCart = async (
  productId: number,
  quantity: number,
  price: number
) => {
  const user = await getSessionUser();
  const userId = Array.isArray(user) ? user[0]?.id : user?.id;
  const total = quantity * price;

  const { data, error } = await supabase.from("cart").insert([
    {
      userid: userId,
      productid: productId,
      quantity: quantity,
      total: total,
      status: "checked",
    },
  ]);

  return { data, error };
};
