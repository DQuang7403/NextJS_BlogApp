"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUserame] = useState<string>("");
  const router = useRouter();
  const handleSignup = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="grid place-items-center">
      <h2 className=" text-xl my-10 font-bold">Welcome to Clairvoyant</h2>
      <form onSubmit={handleSignup} className=" w-96 flex flex-col gap-4">
        <Input
          onChange={(e) => setUserame(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit">Sign up</Button>
      </form>

      <div className="flex items-center justify-center mt-10">
        <span>Already have an account? </span>{" "}
        <Link
          className=" text-[#53c38b] font-semibold ml-1 hover:text-[#4cb07e]"
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
