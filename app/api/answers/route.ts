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

export async function POST(request: Request) {
    const body = await request.json();
    const { text, is_correct, question_id } = body;

    const answer = await prisma.answer.create({
        data: {
            text,
            is_correct,
            question_id
        }
    });

    return new Response(JSON.stringify(answer), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, text, is_correct } = body;

    const answer = await prisma.answer.update({
        where: { id },
        data: {
            text,
            is_correct
        }
    });

    return new Response(JSON.stringify(answer), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}