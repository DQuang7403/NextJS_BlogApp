import React from "react";
import styles from "./editorPick.module.css";
import Image from "next/image";
import { PostType } from "@/utils/types";
import { formatDate } from "@/utils/formatter";
const getData = async () => {
  const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
export default async function EditorPick() {
  const data = await getData();
  return (
    <div className={styles.container}>
      {data?.editorPick?.map((item: PostType) => {
        return (
          <div className={styles.item} key={item.id}>
            <div className={styles.imageContainer}>
              <Image
                src={item.image || "/"}
                className={styles.image}
                width={64}
                height={64}
                alt="hero"
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.category}>{item.cateSlug}</h1>
              <p className={styles.title}>{item.title}</p>
              <div className={styles.details}>
                <h3 className={styles.author}>{item.user.name}</h3>
                <h3 className={styles.date}>{formatDate(item.createdAt)}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
