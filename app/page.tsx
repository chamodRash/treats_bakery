"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { getSessionUser } from "@/data/sessionUser";

import Navbar from "@/components/navbar";
import { CategoryBar } from "@/components/category-bar";
import { ProductSection } from "@/components/product-section";

export default function Home() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const getDbUser = async () => {
    const dbUser = await getSessionUser();

    setLoggedUser(dbUser as User | null);
  };

  useEffect(() => {
    getDbUser();
  }, []);
  console.log(loggedUser);

  return (
    <div className="w-full">
      <Navbar />
      <div className="mx-20">
        <CategoryBar />
        <ProductSection type="all" />
      </div>
    </div>
  );
}
