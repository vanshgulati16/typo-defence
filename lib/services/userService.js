import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "../utils/aws-config";

export const userService = {
  // Cache to store existing users
  _existingUsers: new Set(),

  async checkUserExists(userId) {
    // First check cache
    if (this._existingUsers.has(userId)) {
      return true;
    }

    try {
      const params = {
        TableName: process.env.DYNAMODB_LEADERBOARD_TABLE,
        Key: {
          user_id: userId
        }
      };

      const result = await dynamoDb.send(new GetCommand(params));
      
      if (result.Item) {
        // Add to cache if user exists
        this._existingUsers.add(userId);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error checking user existence:', error);
      return false;
    }
  },

  // Renamed from createNewUser to createUser to match the API calls
  async createUser(userId, username) {
    if (!userId || !username) {
      console.error('❌ Missing required fields:', { userId, username });
      return false;
    }

    // Check if user already exists
    const userExists = await this.checkUserExists(userId);
    if (userExists) {
      console.log('⏩ User already exists, skipping creation:', userId);
      return true;
    }

    const newUser = {
      user_id: userId,
      Name: username,
      Score: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const params = {
      TableName: process.env.DYNAMODB_LEADERBOARD_TABLE,
      Item: newUser,
      // Ensure we don't overwrite if user somehow exists
      ConditionExpression: "attribute_not_exists(user_id)"
    };

    try {
      console.log('📝 Creating new user:', {
        tableName: params.TableName,
        user_id: userId,
        Name: username
      });

      await dynamoDb.send(new PutCommand(params));
      
      // Add to cache after successful creation
      this._existingUsers.add(userId);
      
      console.log('✅ New user created successfully:', userId);
      return true;
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') {
        console.log('⚠️ User already exists (race condition):', userId);
        this._existingUsers.add(userId);
        return true;
      }

      console.error('❌ DynamoDB Error Details:', {
        errorMessage: error.message,
        errorCode: error.code,
        errorName: error.name,
        tableName: params.TableName,
        awsRegion: process.env.AWS_REGION,
        hasCredentials: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
      });
      
      throw error;
    }
  },

  // Method to clear cache if needed
  clearCache() {
    this._existingUsers.clear();
  }
}; 