export const saveQuizResult = async (userId: string, quizId: string, score: number) => {
  try {
    console.log('Saving quiz result:', { userId, quizId, score });
    
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
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(`Failed to save quiz result: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};