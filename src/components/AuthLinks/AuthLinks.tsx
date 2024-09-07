"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./authlink.module.css";
import { signOut, useSession } from "next-auth/react";
export default function AuthLinks() {
  const { status } = useSession();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 640) setOpen(false);
    };
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  });
  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href="/write" className={styles.link} >
            Write
          </Link>
          <div className={styles.link} onClick={() => signOut()}>
            Logout
          </div>
        </>
      ) : (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      )}
      <div className={styles.hamburger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/" className={styles.customLink}>
            Home
          </Link>
          <Link href="/about" className={styles.customLink}>
            About
          </Link>
          <Link href="/contact" className={styles.customLink}>
            Contact
          </Link>
          {status === "authenticated" ? (
            <>
              <Link href="/write" className={styles.customLink}>
                Write
              </Link>
              <Link
                href="/profile"
                className={styles.customLink}
                onClick={() => signOut()}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link href="/login" className={styles.customLink}>
              Login
            </Link>
          )}
        </div>
      )}
    </>
  );
}
