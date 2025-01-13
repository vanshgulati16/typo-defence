import { auth } from '@clerk/nextjs/server';
import { leaderboardService } from '@/lib/services/leaderboard';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      console.error('❌ No user ID found in auth');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔍 Fetching score for user:', userId);
    const score = await leaderboardService.getUserHighScore(userId);
    
    console.log('✅ Score retrieved:', { userId, score });
    return Response.json({ score });
  } catch (error) {
    console.error('❌ Error in GET /api/leaderboard/my-score:', error);
    return Response.json({ error: 'Failed to fetch score' }, { status: 500 });
  }
} 