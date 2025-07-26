export const saveQuizResult = async (userId: string, quizId: string, score: number) => {
  try {
    const response = await fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
        score,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save quiz result');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};