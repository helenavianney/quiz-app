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
export async function POST(request: Request) {
    const body = await request.json();
    const { title, description, user_id } = body;

    const quiz = await prisma.quiz.create({
        data: {
            title,
            description,
            user_id,
            created_at: new Date()
        }
    });

    return new Response(JSON.stringify(quiz), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, title, description } = body;

    const quiz = await prisma.quiz.update({
        where: { id },
        data: {
            title,
            description
        }
    });

    return new Response(JSON.stringify(quiz), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'Quiz ID required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Get all questions for this quiz
    const questions = await prisma.question.findMany({
        where: { quiz_id: id }
    });

    // Delete all answers for each question
    for (const question of questions) {
        await prisma.answer.deleteMany({
            where: { question_id: question.id }
        });
    }

    // Delete all questions for this quiz
    await prisma.question.deleteMany({
        where: { quiz_id: id }
    });

    // Delete results for this quiz
    await prisma.result.deleteMany({
        where: { quiz_id: id }
    });

    // Finally delete the quiz
    await prisma.quiz.delete({
        where: { id }
    });

    return new Response(JSON.stringify({ message: 'Quiz deleted successfully' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}