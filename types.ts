export enum Season {
  Spring = "Spring (Sakura)",
  Summer = "Summer (Festivals)",
  Autumn = "Autumn (Koyo)",
  Winter = "Winter (Snow)"
}

export enum Pace {
  Relaxed = "Relaxed",
  Balanced = "Balanced",
  Packed = "Packed"
}

export interface UserPreferences {
  season: Season;
  pace: Pace;
  interests: string[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GeneratedItinerary {
  text: string;
  groundingChunks?: GroundingChunk[];
}