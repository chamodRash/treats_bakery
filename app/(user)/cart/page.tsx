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
import {
  deleteCartItemById,
  getCartItems,
  updateCartStatusById,
} from "@/data/cart";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  let [cartItems, setCartItems] = useState<any[] | null>([]);
  let [checkedTotal, setCheckedTotal] = useState(0);

  const getCartItemsFromServer = useCallback(async () => {
    const items = await getCartItems();
    setCartItems(items);
  }, []);

  useEffect(() => {
    getCartItemsFromServer();
    const initialCheckedTotal = calculateCheckedTotal(cartItems);
    setCheckedTotal(initialCheckedTotal);
  }, [getCartItemsFromServer]);

  const calculateCheckedTotal = (items: any) => {
    return items.reduce((acc: number, item: any) => {
      return item.status === "checked" ? acc + item.total : acc;
    }, 0);
  };

  const deleteCartItem = async (id: number) => {
    // @ts-ignore
    console.log("This function is implemented.");
    const { data, error } = await deleteCartItemById(id);

    if (error) {
      toast.error("Failed to delete item from cart.");
      return;
    }

    if (!error && cartItems) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.success("Item removed from cart.");
    }
  };

  const selectItem = (checkedID: number) => {
    const updatedCartItems = cartItems?.map((item) => {
      if (item.id === checkedID) {
        const newStatus = item.status === "checked" ? "unchecked" : "checked";
        // Update the item status
        updateCartStatusById(checkedID, newStatus);
        return { ...item, status: newStatus };
      }
      return item;
    });

    // Update the state with the new cart items array
    updatedCartItems && setCartItems(updatedCartItems);

    // Recalculate the total of checked items and update the state
    const newCheckedTotal = calculateCheckedTotal(updatedCartItems);
    setCheckedTotal(newCheckedTotal);
  };

  const runCheckout = () => {
    const checkedItems = cartItems?.filter((item) => item.status === "checked");

    if (checkedItems?.length === 0) {
      toast.error("Please select items to checkout.");
      return;
    }

    let url = "items=";

    // @ts-ignore
    checkedItems?.map((item) => {
      url += `${item.id}.`;
    });

    router.push(`/checkout`);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold uppercase mb-10">
        Your Cart
      </h1>
      <Table>
        <TableCaption>Your Cart</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Select</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // @ts-ignore
            cartItems?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="relative">
                    <Checkbox
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      id={item.id}
                      checked={item.status === "checked" ? true : false}
                      onCheckedChange={() => selectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell className="flex gap-x-3 items-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={10}
                      height={10}
                      className="w-10 h-10 rounded-sm object-cover"
                    />
                    <p>{item.product.name}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {item.product.price}.00
                  </TableCell>
                  <TableCell className="relative w-[250px]">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-x-3 items-center">
                      <Button size={"icon"} variant={"outline"}>
                        <Minus size={13} />
                      </Button>
                      <Input
                        type="number"
                        id="qty"
                        name="qty"
                        placeholder="Quantity"
                        className="w-[100px] text-center"
                        value={item.quantity}
                        // onChange={(e) => setQty(parseInt(e.target.value, 10))}
                      />
                      <Button size={"icon"} variant={"outline"}>
                        <Plus size={13} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {item.total}.00
                  </TableCell>
                  <TableCell className="relative">
                    <Button
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      variant="destructive"
                      onClick={() => {
                        deleteCartItem(item.id);
                      }}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          }
          <TableRow>
            <TableCell colSpan={4} className="text-right text-base font-bold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold border-double border-b-2">
              Rs. {checkedTotal}.00
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="w-full flex items-center justify-center gap-x-5 mt-10">
        <Button variant={"secondary"}>Clear Cart</Button>
        <Button variant={"default"} onClick={runCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
