"use client";

import { getSessionUser } from "@/data/sessionUser";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { User } from "@supabase/supabase-js";

import Logo from "@/public/logo.png";
import LoginBtn from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import { getCartCount } from "@/data/cart";

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  const getDbUser = useCallback(async () => {
    const dbUser = await getSessionUser();

    setLoggedUser(dbUser as User | null);
    console.log(dbUser);
  }, []);

  const getCartCountFromServer = useCallback(async () => {
    const cartCount = await getCartCount();
    cartCount && setCartCount(cartCount);
  }, []);

  useEffect(() => {
    getDbUser();
    getCartCountFromServer();
  }, [getDbUser, getCartCountFromServer]);

  return (
    <nav className="w-full h-28 bg-secondary drop-shadow-md">
      <div className="w-10/12 mx-auto h-full flex items-center justify-between ">
        <Link href={"/"}>
          <Image src={Logo} width={70} height={70} alt="Logo" />
        </Link>
        <div className="flex items-center w-2/3 gap-x-10 justify-end">
          <form action="" className="relative flex items-center">
            <Input
              type="search"
              className="peer transition-all cursor-pointer z-10 h-12 w-12 rounded-full bg-transparent  outline-none focus:z-0 focus:border focus:w-[500px] focus:cursor-text focus:border-primary focus:pl-8 focus:pr-4"
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              className={
                "absolute transition-all rounded-full text-base font-bold text-[hsl(26,58%,23%)] peer-hover:bg-white peer-focus:right-2 peer-focus:text-white peer-focus:bg-primary"
              }>
              <Search size={20} />
            </Button>
          </form>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={
              "text-primary hover:bg-white hover:text-primary rounded-full text-xl relative"
            }>
            <Link href={"/cart"}>
              <ShoppingCart size={20} />
            </Link>
            <span className="absolute -top-1 -right-1 bg-white text-primary text-xs font-normal w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Button>

          {!loggedUser && (
            <LoginBtn asChild>
              <Button variant={"default"} size={"lg"}>
                Sign in
              </Button>
            </LoginBtn>
          )}
          {loggedUser && <UserMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
