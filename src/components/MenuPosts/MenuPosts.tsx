import React from "react";
import styles from "./menuposts.module.css";
import { formatDate } from "@/utils/formatter";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export default async function MenuPosts() {
  const { latestPost, total } = await getData();
  return (
    <div className={styles.container}>
      {latestPost?.map((item: any) => {
        return (
          <Link href={`/blog/${item.id}`} className={styles.item} key={item.id}>
            <div className={`${styles.category} ${styles[item.cateSlug]}`}>
              {item.cateSlug}
            </div>
            <h2 className={styles.title}>{item.title}</h2>
            <div className={styles.details}>
              <h3 className={styles.author}>{item.user.name}</h3>
              <h3 className={styles.date}>{formatDate(item.createdAt)}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
