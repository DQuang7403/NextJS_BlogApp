import React from "react";
import styles from "./menu.module.css";
import MenuPosts from "../MenuPosts/MenuPosts";
import CategoryPills from "../categoryPills/CategoryPills";
import EditorPick from "../EditorPick/EditorPick";

export default async function Menu() {

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>What's New</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <CategoryPills />
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <EditorPick />
    </div>
  );
}
