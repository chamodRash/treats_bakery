"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductSection } from "@/components/product-section";
import Image from "next/image";
import { getProductById } from "@/data/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const productID = searchParams.get("product");

  const [product, setProduct] = useState<any | null>({});
  const [qty, setQty] = useState(1);

  const getProduct = useCallback(async () => {
    const result = await getProductById(Number(productID));

    setProduct(result);
  }, []);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-x-5">
        <Image
          width={100}
          height={100}
          src={product?.image}
          alt={product?.name}
          className="w-96 h-96 rounded-3xl object-cover justify-self-center"
        />
        <div className="space-y-5 py-5 pr-5">
          <div className="flex flex-col gap-y-3 w-full">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <p className="text-justify indent-10 text-gray-700">
              {product?.description}
            </p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <Label className="mb-2">Quantity</Label>
              <div className="flex items-center gap-x-2">
                <Button
                  onClick={() => setQty(qty - 1)}
                  variant={"outline"}
                  size={"icon"}>
                  <Minus size={13} />
                </Button>
                <Input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-20"
                />
                <Button
                  onClick={() => setQty(qty + 1)}
                  variant={"outline"}
                  size={"icon"}>
                  <Plus size={13} />
                </Button>
              </div>
            </div>
            <p className="font-bold text-xl text-primary text-right">
              Rs. {product?.price}/=
            </p>
          </div>
          <div className="w-full grid grid-cols-2 items-center justify-stretch gap-x-5">
            <Button variant={"secondary"} className="rounded-full">
              Add to Cart
            </Button>
            <Button variant={"default"} className="rounded-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <ProductSection type="all" />
    </div>
  );
};

export default ProductPage;
