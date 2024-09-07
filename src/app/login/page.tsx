"use client";
import Link from "next/link";
import styles from "./login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Github } from "lucide-react";
import { useState } from "react";
export default function page() {
  const { data, status } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  const handleLogin = async () => {
    

    const res = await signIn("credentials", {
      redirect: false,
      email, // Email passed as part of second argument
      password, // Password passed as part of second argument
    }); 

    if (res?.ok) {
      router.push("/"); // Redirect to home page if login is successful
    } else {
      console.log("Login failed");
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Welcome back to Clairvoyant</h2>
        <div className={styles.socialButton} onClick={() => signIn("github")}>
          <Github style={{ width: 20, height: 20, marginRight: 10 }} />
          Sign in with Github
        </div>
        <span className={styles.divider}>or</span>
        <div>
          <div>
            <input
              className={styles.input}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className={styles.input}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className={styles.button} onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
        <div className={styles.noAccount}>
          <span className={styles.noAccountText}>No account? </span>{" "}
          <Link className={styles.noAccountLink} href="/signup">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
