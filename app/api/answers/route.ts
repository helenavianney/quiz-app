import { prisma } from '@/app/lib/prisma'

export async function GET() {
    const answers = await prisma.answer.findMany()

    return new Response(JSON.stringify(answers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}