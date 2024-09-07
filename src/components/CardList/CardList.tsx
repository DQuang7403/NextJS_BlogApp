import React from "react";
import Pagination from "../pagination/Pagination";
import styles from "./cardlist.module.css";
import Card from "../Card/Card";
const getData = async (page: number, category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&category=${
      category || ""
    }`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export default async function CardList({
  page,
  category,
}: {
  page: number;
  category: string;
}) {
  const { latestPost, total, editorPick } = await getData(page, category);
  const POST_PER_PAGE = 4;
  const hasPrevious = page > 1;
  const hasNext = total > POST_PER_PAGE * page;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {latestPost?.map((item: any) => {
          return <Card key={item.id} {...item} />;
        })}
      </div>
      <Pagination
        page={page}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </div>
  );
}
