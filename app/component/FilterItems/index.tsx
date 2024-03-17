"use client";


import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const headItems = [
  {
    id: 0,
    name: "beach",
    description: "This Property is close to the Beach.",
    title: "Beach",
    imageUrl:
      "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
  },
  {
    id: 1,
    name: "trending",
    description: "This is a Property which is trending.",
    title: "Trending",
    imageUrl:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
  },
  {
    id: 2,
    name: "beachfront",
    description: "This is a Property is close to the beachfront",
    title: "Beachfront",
    imageUrl:
      "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
  },
  {
    id: 3,
    name: "erathhome",
    description: "This Property is considerd a Earth Home",
    title: "Earth Home",
    imageUrl:
      "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
  },
  {
    id: 4,
    name: "luxe",
    description: "This Property is considerd Luxorious",
    title: "Luxe",
    imageUrl:
      "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
  },
  {
    id: 5,
    name: "amazingView",
    description: "This property has an amazing View",
    title: "Amazing View",
    imageUrl:
      "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
  },
  {
    id: 6,
    name: "design",
    description: "This property puts a big focus on design ",
    title: "Design",
    imageUrl:
      "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
  },
  {
    id: 7,
    name: "pool",
    description: "This property has an amazing Pool",
    title: "Pool",
    imageUrl:
      "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
  },
  {
    id: 8,
    name: "tiny",
    description: "This property is considered a tiny home",
    title: "Tiny Home",
    imageUrl:
      "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
  },
  {
    id: 9,
    name: "historic",
    description: "This Property is considered historic",
    title: "Historic Home",
    imageUrl:
      "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
  },
  {
    id: 10,
    name: "countryside",
    description: "This Property is located on the countryside",
    title: "Countryside",
    imageUrl:
      "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
  },
  {
    id: 11,
    name: "omg",
    description: "This Property has a wow factor",
    title: "WOW!",
    imageUrl:
      "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
  },
  {
    id: 12,
    name: "surfing",
    description: "This Property is located near to a surfing spot",
    title: "Surfing",
    imageUrl:
      "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
  },
];

const FilterItems = () => {
  const searchParamas = useSearchParams();
  const search = searchParamas?.get("filter");
  const pathName = usePathname();
  const createQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParamas?.toString());

      params.set(name, value);
      return params.toString();
    },
    [searchParamas]
  );

  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {headItems.map((eachItem) => (
        <Link
        key={eachItem.id}
        href={`${pathName}?${createQuery("filter", eachItem.name)}`}
        className={cn(
            search === eachItem.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center"

        )}
        >
          <div className="relative w-6 h-6">
            <Image
              src={eachItem.imageUrl}
              alt={eachItem.title}
              width="24"
              height="24"
            />
          </div>
          <p className="text-xs font-medium">{eachItem.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default FilterItems;