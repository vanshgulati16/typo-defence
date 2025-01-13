import { auth } from '@clerk/nextjs/server';
import { leaderboardService } from '@/lib/services/leaderboard';
import { userService } from '@/lib/services/userService';

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

    const { score, username } = await request.json();
    
    console.log('📝 Attempting to update score for:', { 
      userId,
      username,
      score 
    });

    // First update the username
    await userService.updateUsername(userId, username);

    // Then update the score
    const result = await leaderboardService.updateHighScore(
      userId,
      score,
      username
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