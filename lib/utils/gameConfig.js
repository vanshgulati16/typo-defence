export const gameConfig = {
  waves: {
    1: {
      enemyCount: 5,
      spawnInterval: 2000,
      speedMultiplier: 1
    },
    2: {
      enemyCount: 7,
      spawnInterval: 1800,
      speedMultiplier: 1.2
    },
    3: {
      enemyCount: 10,
      spawnInterval: 1500,
      speedMultiplier: 1.4
    },
    4: {
      enemyCount: 12,
      spawnInterval: 1200,
      speedMultiplier: 1.6
    },
    5: {
      enemyCount: 15,
      spawnInterval: 1000,
      speedMultiplier: 1.8
    }
  },
  enemy: {
    baseSpeed: 2,
    movement: {
      minY: 20,
      maxY: 80,
      defenseLinePosition: 70,
      collisionThreshold: 260
    }
  }
} 