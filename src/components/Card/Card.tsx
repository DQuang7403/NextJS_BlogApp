import Image from "next/image";
import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import { PostType } from "@/utils/types";
import { formatDate } from "@/utils/formatter";
export default function Card({ ...props }: PostType) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={props.image ?? "/styles.jpg"}
          className={styles.image}
          alt={props.title}
          width={350}
          height={300}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.details}>
          <span className={styles.date}>{formatDate(props.createdAt)}</span>
          <span className={styles.category}>{props.cateSlug}</span>
        </div>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.desc}>{props.desc}</p>
        <Link href={`/blog/${props.id}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
}
