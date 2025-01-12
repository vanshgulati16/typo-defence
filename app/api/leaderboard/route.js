import { auth } from '@clerk/nextjs/server';
import { leaderboardService } from '@/lib/services/leaderboard';

export async function GET() {
  try {
    const leaderboard = await leaderboardService.getLeaderboard();
    return Response.json(leaderboard);
  } catch (error) {
    console.error('Error in GET /api/leaderboard:', error);
    return Response.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, user } = await auth();
    
    if (!userId) {
      console.error('❌ Unauthorized request to leaderboard');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { score } = await request.json();
    
    console.log('📝 Attempting to update score for:', { 
      userId,
    //   username: user.username || user.firstName || 'Player',
      score 
    });

    const result = await leaderboardService.updateHighScore(
      userId,
    //   user.username || user.firstName || 'Player',
      score
    );

    if (result) {
      console.log('✅ High score updated successfully');
      return Response.json({ success: true });
    } else {
      console.log('ℹ️ Score not higher than existing');
      return Response.json({ success: false, reason: 'not-higher' });
    }
  } catch (error) {
    console.error('❌ Error in POST /api/leaderboard:', error);
    return Response.json({ error: 'Failed to update score' }, { status: 500 });
  }
} 