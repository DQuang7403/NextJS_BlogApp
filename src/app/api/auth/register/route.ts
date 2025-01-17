import prisma from "@/utils/auth";
import { NextResponse } from "next/server";

import {genSaltSync, hashSync} from "bcrypt-ts"


export async function POST(request: Request) {
  try {
    const { name, email, password } : { name: string, email: string, password: string } = await request.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Missing email or password" }), { status: 400  }
      )
    }
    const salt = genSaltSync(10);
    
    const exsitingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (exsitingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }), { status: 400 }
      )
    }
    const hashedPassword = hashSync(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: password,
        hashedPassword: hashedPassword
      }
    })

    return new NextResponse(
      JSON.stringify({ message: "User created" }), { status: 200 }
    )
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "success" });
}