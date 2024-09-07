"use client";
import React, { useEffect, useState } from "react";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Comment } from "@/utils/types";
import { formatDate } from "@/utils/formatter";
import { User } from "lucide-react";
export default function Comments({ postSlug }: { postSlug: string }) {
  const [comment, setComment] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    comment.length > 3 ? setDisabled(false) : setDisabled(true);
  }, [comment]);

  const { data, status } = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `http://localhost:3000/api/comments?slug=${postSlug}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, []);
  console.log(data, status)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desc: comment,
        postSlug: postSlug,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    setComments([...comments, data]);
    setComment("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      <div className={styles.comments}>
        {status === "unauthenticated" && (
          <div className={styles.warning}>
            * You need to be logged in to comment
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.newComment}>
          <div className={styles.writeContainer}>
            {data?.user?.image ? (
              <Image
                src={data?.user?.image}
                className={styles.avatar}
                alt="user"
                width={32}
                height={32}
              />
            ) : (
              <User className={styles.avatar} />
            )}
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              className={styles.commentInput}
              placeholder="Add a comment"
            />
          </div>
          <button
            type="submit"
            className={styles.commentButton}
            disabled={disabled}
          >
            Comment
          </button>
        </form>
        {comments.map((comment) => {
          return (
            <div className={styles.comment} id={comment.id}>
              <div className={styles.user}>
                {comment.user.image ? (
                  <Image
                    src={comment.user?.image}
                    className={styles.avatar}
                    alt="user"
                    width={32}
                    height={32}
                  />
                ) : (
                  <User className={styles.avatar} />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{comment.user?.name}</span>
                  <span className={styles.date}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>
              <p className={styles.desc}>{comment.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
