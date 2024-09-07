import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import AuthLinks from "../AuthLinks/AuthLinks";
export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Clairvoyant</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
}
