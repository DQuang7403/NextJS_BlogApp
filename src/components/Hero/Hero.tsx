import Image from "next/image";
import React from "react";
import styles from "./hero.module.css"
export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Welcome to Clairvoyant</h1>
        <p className={styles.desc}>Your Gateway to Endless Stories and Ideas</p>
        <button className={styles.button}>Get Started</button>
      </div>

      <div className={styles.item}>
        <Image src={"/hero.png"} className={styles.image} width={500} height={500} alt="hero" />
      </div>
    </div>
  );
}
