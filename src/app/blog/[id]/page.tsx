import React from "react";
import styles from "./blog.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import Menu from "@/components/menu/Menu";
import { formatDate } from "@/utils/formatter";
import { User } from "lucide-react";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export default async function SingleBlog({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await getData(id);
  return (
    <article className={styles.container}>
      <div className={styles.blogHeader}>
        <div className={styles.details}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              {data.user.image ? (
                <Image
                  src={`${data.user.image}`}
                  fill
                  className={styles.avatar}
                  alt="user"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <User className={styles.avatar} />
              )}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.username}>{data.user.name}</span>
              <span className={styles.date}>{formatDate(data.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={styles.blogImage}>
          <Image
            src={`${data.image}`}
            fill
            className={styles.image}
            alt="hero"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.desc}>{data.desc}</div>
        <div
          className={styles.post}
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
      </div>
      <div className={styles.features}>
        <Comments postSlug={data.slug} />
        <Menu />
      </div>
    </article>
  );
}
