import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "../utils/aws-config";

export const leaderboardService = {
  async updateHighScore(userId, score) {
    console.log('🔵 Attempting to update high score:', { userId, score });
    
    try {
      // First, get the current score
      const currentScore = await this.getUserHighScore(userId);
      
      // Only update if the new score is higher
      if (score > currentScore) {
        const params = {
          TableName: process.env.DYNAMODB_LEADERBOARD_TABLE,
          Item: {
            user_id: userId,
            Score: score,
            updated_at: new Date().toISOString()
          }
        };

        await dynamoDb.send(new PutCommand(params));
        console.log('✅ High score updated successfully:', { userId, score });
        return true;
      } else {
        console.log('ℹ️ Score not higher than existing:', { 
          userId, 
          currentScore, 
          newScore: score 
        });
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating high score:', error);
      return false;
    }
  },

  async getUserHighScore(userId) {
    console.log('🔍 Fetching high score for user:', userId);
    const params = {
      TableName: process.env.DYNAMODB_LEADERBOARD_TABLE,
      Key: {
        user_id: userId
      }
    };

    try {
      const result = await dynamoDb.send(new GetCommand(params));
      const score = result.Item?.Score || 0;
      console.log('✅ Current user score:', { userId, score });
      return score;
    } catch (error) {
      console.error('❌ Error fetching user score:', error);
      return 0;
    }
  },

  async getLeaderboard(limit = 10) {
    console.log('🔵 Fetching leaderboard data');
    const params = {
      TableName: process.env.DYNAMODB_LEADERBOARD_TABLE,
      ScanIndexForward: false,
    };

    try {
      const result = await dynamoDb.send(new ScanCommand(params));
      
      const sortedItems = result.Items
        .sort((a, b) => (b.Score || 0) - (a.Score || 0))
        .slice(0, limit)
        .map((item, index) => ({
          rank: index + 1,
          username: item.Name || 'Player',
          score: item.Score || 0
        }));

      console.log('✅ Processed leaderboard:', sortedItems);
      return sortedItems;
    } catch (error) {
      console.error('❌ Error fetching leaderboard:', error);
      return [];
    }
  }
}; 