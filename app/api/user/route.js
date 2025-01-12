import { userService } from '@/lib/services/userService';
// import { headers } from 'next/headers';

export async function POST(request) {
  try {
    // const headersList = headers();
    const { userId, username } = await request.json();
    
    console.log('📝 Creating/updating user:', { userId, username });
    
    const result = await userService.createUser(userId, username);
    
    console.log('✅ User operation result:', { success: result });
    
    return Response.json({ success: result });
  } catch (error) {
    console.error('❌ Error in POST /api/user:', error);
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return Response.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await userService.getUser(userId);
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
} 