import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { z } from "zod";

const resultSchema = z.object({
  user_id: z.string(),
  quiz_id: z.string(),
  score: z.number().min(0),
});

export async function GET() {
  const results = await prisma.result.findMany();
  
  return NextResponse.json(results, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationResult = resultSchema.safeParse(body);
  
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error.issues[0].message },
      { status: 400 }
    );
  }

  const { user_id, quiz_id, score } = validationResult.data;

  const result = await prisma.result.create({
    data: {
      user_id,
      quiz_id,
      score,
      created_at: new Date(),
    },
  });

  return NextResponse.json(
    { 
      message: "Hasil quiz berhasil disimpan",
      result 
    },
    { status: 201 }
  );
}