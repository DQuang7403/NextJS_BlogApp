import prisma from "@/utils/auth";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/options";

export const GET = async (req: Request) => {
  const {searchParams} = new URL(req.url);
  const slug = searchParams.get('slug') || '';

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(slug && { postSlug: slug }),
      },
      include: {
        user: true
      }
    })
    return new NextResponse(
      JSON.stringify(comments), { status: 200  }
    )
    
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }), { status: 500  }
    )
  }
}

export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if(!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }), { status: 401 }
    )
  }
  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user?.email,
      },
      include: {
        user: true
      }
    })
    
    return new NextResponse(
      JSON.stringify(comment), { status: 200  }
    )
  }catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }), { status: 500  }
    )
  }
}