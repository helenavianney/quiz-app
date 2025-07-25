import { prisma } from '@/app/lib/prisma'

export async function GET() {
    const quizzes = await prisma.quiz.findMany()

    return new Response(JSON.stringify(quizzes), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}