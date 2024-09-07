import Link from "next/link";
import React from "react";
import styles from "./categoryPills.module.css";
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

export default async function CategoryPills() {
  const data = await getData();
  return (
    <div className={styles.categoryList}>
      {data?.categories?.map((item: CategoryType) => {
        return (
          <Link
            href={`/category?category=${item.slug}`}
            key={item.id}
            className={`${styles.categoryItem} ${styles[item.slug]}`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
