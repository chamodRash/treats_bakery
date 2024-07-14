"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductSection } from "@/components/product-section";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryID = searchParams.get("id");

  return (
    <div>
      <ProductSection type="category" value={String(categoryID)} />
    </div>
  );
};

export default CategoryPage;
