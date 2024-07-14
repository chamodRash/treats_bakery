"use server";

import { createClient } from "@/utils/supabase/server";
import { getSessionUser } from "./sessionUser";
import { getProductById } from "./product";

const supabase = createClient();

export const getCartCount = async () => {
  const user = await getSessionUser();
  const userId = Array.isArray(user) ? user[0]?.id : user?.id;

  const { data, error } = await supabase
    .from("cart")
    .select("productid")
    .eq("userid", userId);

  return data?.length;
};

export const getCartItems = async () => {
  const user = await getSessionUser();
  const userId = Array.isArray(user) ? user[0]?.id : user?.id;
  const products = [];

  const { data, error } = await supabase
    .from("cart")
    .select(
      ` id,
        userid,
        productid,
        quantity,
        total,
        status,
        product (
          id,
          name,
          price,
          image
        )
      `
    )
    .eq("userid", userId);

  return data;
};

export const getCheckedCartItems = async () => {
  const user = await getSessionUser();
  const userId = Array.isArray(user) ? user[0]?.id : user?.id;
  const products = [];

  const { data, error } = await supabase
    .from("cart")
    .select(
      ` id,
        userid,
        productid,
        quantity,
        total,
        status,
        product (
          id,
          name,
          price,
          image
        )
      `
    )
    .eq("userid", userId)
    .eq("status", "checked");

  return data;
};

export const deleteCartItemById = async (id: number) => {
  const { data, error } = await supabase.from("cart").delete().eq("id", id);

  return { data, error };
};

export const updateCartStatusById = async (id: number, status: string) => {
  const { data, error } = await supabase
    .from("cart")
    .update({ status: status })
    .eq("id", id);

  return { data, error };
};
