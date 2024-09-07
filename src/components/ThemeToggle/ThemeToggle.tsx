"use client";
import Image from "next/image";
import React, { useContext } from "react";
import styles from "./themetoggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      onClick={toggleTheme}
      style={
        theme === "dark"
          ? { backgroundColor: "#cccccc" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="moon" width={14} height={14} />
      <div
        className={styles.toggleBall}
        style={
          theme === "dark"
            ? { left: "2px", backgroundColor: "#0f172a" }
            : { right: "2px", backgroundColor: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="sun" width={14} height={14} />
    </div>
  );
}
