import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>Clairvoyant</h1>
        </div>
        <p className={styles.desc}>
          <strong>Clairvoyant</strong> is a dynamic blog platform designed to inspire and connect
          storytellers and readers. Whether you're here to share your insights,
          explore diverse perspectives, or engage in thought-provoking
          conversations, Clairvoyant offers a space where creativity and vision
          thrive. Discover content that sees beyond the surface and connect with
          a community passionate about meaningful ideas.
        </p>
        <div className={styles.icons}>
          <Github />
          <Facebook />
          <Instagram />
          <Linkedin />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
}
