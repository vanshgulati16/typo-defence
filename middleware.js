import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
    afterAuth: async (auth, req) => {
      if (!auth?.userId) return;

      try {
        const user = auth.user;
        const displayName = user?.username || user?.firstName || 'Player';

        // Create a new request to the user API
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: auth.userId,
            username: displayName
          })
        });

        if (!response.ok) {
          console.error('❌ Failed to create user:', response.statusText);
        } else {
          console.log('✅ User saved to database:', {
            userId: auth.userId,
            username: displayName
          });
        }

        // Continue with the original request
        return NextResponse.next();
      } catch (error) {
        console.error('❌ Middleware Error:', error);
        // Continue even if there's an error
        return NextResponse.next();
      }
    }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};