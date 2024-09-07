import prisma from "@/utils/auth";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/options";

export const GET = async (req: Request) => {

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category') || '';
  const POST_PER_PAGE= 4;
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    orderBy: {
      createdAt: "desc" as const
    },
    include: {
      user: true
    },
    where: {
      ...(category && {cateSlug: category})
    }
  
  }

  try {

    const [latestPost, total, editorPick] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({where: query.where}),
      prisma.post.findMany({take: 3, where: {editorPick: true}, include: {user: true}})
    ])

    return new NextResponse(
      JSON.stringify({ latestPost, total, editorPick }), { status: 200  }
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
    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user?.email,
      }
    })
    
    return new NextResponse(
      JSON.stringify(post), { status: 200  }
    )
  }catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }), { status: 500  }
    )
  }
}