"use client";
import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export default function Pagination({
  page,
  hasPrevious,
  hasNext,
}: PaginationProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => router.push(`/?page=${page - 1}`)}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <button
        className={styles.button}
        onClick={() => router.push(`/?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
