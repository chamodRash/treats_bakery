"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCartItems } from "@/data/cart";
import { useEffect, useState } from "react";
import { set } from "zod";
import { getProductById } from "@/data/product";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[] | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [qty, setQty] = useState(1);

  useEffect(() => {
    const getCartItemsFromServer = async () => {
      const items = await getCartItems();
      setCartItems(items);

      if (Array.isArray(items) && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          const product = await getProductById(items[i].productid);

          if (cartItems) {
            cartItems[i] = { ...cartItems[i], ...product };
          }
        }
      }
    };

    getCartItemsFromServer();
    console.log(cartItems);
  }, []);

  return (
    <Table>
      <TableCaption>Your Cart</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Select</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          // @ts-ignore
          cartItems?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    id={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => {
                      if (selectedItems.includes(item.id)) {
                        setSelectedItems(
                          selectedItems.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedItems([...selectedItems, item.id]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>Rs. {item.price}</TableCell>
                <TableCell className="text-right">
                  <div className="w-full flex gap-x-3 items-center">
                    <Button size={"icon"} variant={"outline"}>
                      -
                    </Button>
                    <Input
                      type="number"
                      id="qty"
                      name="qty"
                      placeholder="Quantity"
                      className="w-1/2"
                      value={item.quantity}
                      // onChange={(e) => setQty(parseInt(e.target.value, 10))}
                    />
                    <Button size={"icon"} variant={"outline"}>
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">${item.total}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" onClick={() => {}}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  );
};

export default CartPage;
