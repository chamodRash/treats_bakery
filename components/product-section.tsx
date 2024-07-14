"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "./product-grid";
import {
  getAllProducts,
  getCategoryById,
  getProductsByCategory,
  getProductsBySearch,
} from "@/data/product";

interface ProductSectionProps {
  type: string;
  value?: string;
}
export const ProductSection = ({ type, value }: ProductSectionProps) => {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<[]>([]);

  useEffect(() => {
    if (type === "category" && value) {
      const valueInt = parseInt(value, 10);

      const getCategory = async () => {
        const category = await getCategoryById(valueInt);
        setCategory(category as any);
      };

      const getProducts = async () => {
        const products = await getProductsByCategory(valueInt);
        setProducts(products as any);
      };

      getCategory();
      getProducts();
    }

    if (type === "search") {
      const getProducts = async () => {
        const products = await getProductsBySearch(value);

        setProducts(products as any);
      };

      getProducts();
    }

    if (type === "all") {
      const getProducts = async () => {
        const products = await getAllProducts();

        setProducts(products as any);
      };

      getProducts();
    }
  }, []);

  return (
    <div>
      {type === "category" && category && (
        <h1 className="text-3xl font-bold mb-10 text-center uppercase">
          {category.name}
        </h1>
      )}
      {type === "search" && (
        <h1 className="text-3xl font-bold mb-10 text-center uppercase">
          Search results for: {value}
        </h1>
      )}
      {type === "all" && (
        <h1 className="text-3xl font-bold mb-10 text-center uppercase">
          Products
        </h1>
      )}

      <ProductGrid products={products} />
    </div>
  );
};
