import Link from "next/link";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: [];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-fluid gap-8">
      {products.map((product: any, index) => (
        <ProductCard
          key={index}
          id={product.id}
          name={product.name}
          price={product.price}
          qty={product.qty}
          image={product.image}
        />
      ))}
    </div>
  );
};
