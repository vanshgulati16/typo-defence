import { userService } from '@/lib/services/userService';

export async function GET() {
  try {
    console.log('🧪 Testing DynamoDB Connection');
    
    // Test user data
    const testUser = {
      userId: 'test-' + Date.now(),
      Name: 'TestUser'
    };

    // Attempt to create user
    await userService.createUser(testUser.userId, testUser.Name);

    return Response.json({ success: true, message: 'Check your terminal for logs' });
  } catch (error) {
    console.error('❌ Test failed:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
} 