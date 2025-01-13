import { auth } from '@clerk/nextjs/server';
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

export async function PUT(request) {
  try {
    const { userId } = await auth();
    const { username } = await request.json();
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await userService.updateUsername(userId, username);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating username:', error);
    return Response.json({ error: 'Failed to update username' }, { status: 500 });
  }
} 