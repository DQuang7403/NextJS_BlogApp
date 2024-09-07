"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function page() {
  const { data, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const handleSignup = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      alert("Something went wrong");
    }
  };
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Welcome to Clairvoyant</h2>
        <div>
        <input
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <input
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className={styles.button} onClick={handleSignup}>
            Sign up
          </button>
        </div>

        <div className={styles.noAccount}>
          <span className={styles.noAccountText}>
            Already have an account?{" "}
          </span>{" "}
          <Link className={styles.noAccountLink} href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
