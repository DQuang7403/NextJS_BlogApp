import React from "react";
import styles from "./categorylist.module.css";
import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/utils/types";
const getData = async () => {
  const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function CategoryList() {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.categories?.map((item: CategoryType) => {
          return (
            <Link
              href={`/category?category=${item.slug}`}
              key={item.id}
              className={`${styles.categoryItem} ${styles[item.slug]}`}
            >
              <Image
                src={`${item.image}`}
                className={styles.image}
                alt={`${item.slug}`}
                width={32}
                height={32}
              />
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
