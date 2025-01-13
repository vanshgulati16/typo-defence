'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useGameStore } from "../lib/stores/gameStore";

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { actions } = useGameStore();

  useEffect(() => {
    if (isSignedIn && user) {
      const username = user.username || user.firstName || 'Player';
      actions.setUsername(username);
    }
  }, [isSignedIn, user, actions]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="text-sm font-medium">
      Hola, {user.username || user.firstName || 'Player'}
    </div>
  );
} 