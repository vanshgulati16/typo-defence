'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Create/update user in database when signed in
  useEffect(() => {
    async function createUserInDb() {
      if (!isSignedIn || !user) return;

      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            username: user.username || user.firstName || 'Player'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create user');
        }

        console.log('✅ User saved to database:', {
          userId: user.id,
          username: user.username || user.firstName || 'Player'
        });
      } catch (error) {
        console.error('❌ Error saving user:', error);
      }
    }

    createUserInDb();
  }, [isSignedIn, user]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="text-sm font-medium">
      Hola, {user.username || user.firstName || 'Player'}
    </div>
  );
} 