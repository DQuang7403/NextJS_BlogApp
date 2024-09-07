import prisma from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const {id} = params;

  try {
    const singlePost = await prisma.post.update({
      where: {
        id
      },
      data: {
        views: {increment: 1}
      },
      include: {
        user: true
      }
    })
    return new NextResponse(
      JSON.stringify(singlePost), { status: 200  }
    )
    
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }), { status: 500  }
    )
  }
}