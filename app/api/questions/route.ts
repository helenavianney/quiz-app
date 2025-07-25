import { prisma } from '@/app/lib/prisma'

export async function GET() {
    const questions = await prisma.question.findMany()

    return new Response(JSON.stringify(questions), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}