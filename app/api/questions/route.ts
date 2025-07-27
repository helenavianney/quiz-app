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

export async function POST(request: Request) {
    const body = await request.json();
    const { text, quiz_id } = body;

    const question = await prisma.question.create({
        data: {
            text,
            quiz_id
        }
    });

    return new Response(JSON.stringify(question), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, text } = body;

    const question = await prisma.question.update({
        where: { id },
        data: { text }
    });

    return new Response(JSON.stringify(question), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}