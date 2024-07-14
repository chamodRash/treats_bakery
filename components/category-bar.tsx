import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

export const CategoryBar = () => {
  const supabase = createClient();
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    let { data: category, error } = await supabase.from("category").select("*");

    setCategory(category as any);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Carousel className="w-full my-10">
      <CarouselContent>
        {category &&
          category.map((category: any, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/3 lg:basis-1/4">
              <Link href={`/category?id=${category?.id}`}>
                <div
                  className="w-56 h-20 bg-cover bg-center rounded-xl cursor-pointer"
                  style={{ backgroundImage: `url(${category?.img_url})` }}>
                  <div className="relative w-full h-full backdrop-blur-[3px] rounded-xl">
                    <div className="w-full h-full bg-black opacity-30 rounded-xl"></div>
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-lg drop-shadow-2xl">
                      {category?.name}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    // <div className="w-full my-10">
    // </div>
  );
};
