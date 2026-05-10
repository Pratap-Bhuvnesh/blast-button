import { NextResponse } from "next/server";

export async function GET() {
  return Response.json([
    {
      id: "1",
      title: "Vine Boom",
      audioUrl: "/sounds/vine.mp3",
      category: "meme",
      tags: ["viral"],
      plays: 1200000,
      likes: 50000,
      duration: 2,
      createdAt: new Date().toISOString(),
    },
  ]);
}
export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  return NextResponse.json({
    success: true,
  });
}