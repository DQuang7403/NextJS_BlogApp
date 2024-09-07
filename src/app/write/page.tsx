"use client";

import { useEffect, useState } from "react";
import styles from "./write.module.css";
import Image from "next/image";
import { FileImage, FileVideo, Plus, Upload } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UploadImage from "@/components/UploadImage";
import DynamicImage from "@/components/DynamicImage";
export default function page() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [cateSlug, setCateSlug] = useState<string>("style");
  const [content, setContent] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [progress, setProgress] = useState<boolean>(false);

  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handlePublish = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        slug: slugify(title),
        content,
        cateSlug: cateSlug || "style",
        image: imageURL,
      }),
    });
    if (res.ok) {
      router.push("/");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className={styles.desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCateSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.uploadContainer}>
        {imageURL !== "" && (
          <div className={styles.imageContainer}>
            <DynamicImage
              src={imageURL}
              alt="hero"
              width={150}
              height={150}
              className={styles.image}
            />
          </div>
        )}
        {progress && (
          <div className={styles.loadingContainer}>
            <div className="loader" />
            <div>Uploading...</div>
          </div>
        )}
      </div>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Plus color={"var(--text-color)"} />
        </button>

        {open && (
          <div className={styles.add}>
            <UploadImage setImageURL={setImageURL} setProgress={setProgress} />
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
}
