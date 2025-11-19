import { Season, Pace } from './types';

export const SEASONS = [
  { value: Season.Spring, label: 'Spring (Cherry Blossoms)', icon: '🌸' },
  { value: Season.Summer, label: 'Summer (Fireworks & Festivals)', icon: '🎆' },
  { value: Season.Autumn, label: 'Autumn (Fall Colors)', icon: '🍁' },
  { value: Season.Winter, label: 'Winter (Snow & Onsens)', icon: '❄️' },
];

export const PACES = [
  { value: Pace.Relaxed, label: 'Relaxed', desc: '1-2 major spots per day' },
  { value: Pace.Balanced, label: 'Balanced', desc: 'Mix of sightseeing and leisure' },
  { value: Pace.Packed, label: 'Packed', desc: 'Maximize every hour' },
];

export const INTERESTS = [
  { id: 'history', label: 'History & Culture', icon: '⛩️' },
  { id: 'food', label: 'Food & Drink', icon: '🍣' },
  { id: 'anime', label: 'Anime & Pop Culture', icon: '🤖' },
  { id: 'nature', label: 'Nature & Hiking', icon: '🗻' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'tech', label: 'Tech & Gadgets', icon: '🎮' },
];

export const IMAGE_MAP: Record<string, string> = {
  default: 'https://picsum.photos/seed/japan/1200/600',
  tokyo: 'https://picsum.photos/seed/tokyo_night/800/600',
  kyoto: 'https://picsum.photos/seed/kyoto_temple/800/600',
  osaka: 'https://picsum.photos/seed/osaka_food/800/600',
  nature: 'https://picsum.photos/seed/japan_nature/800/600',
  food: 'https://picsum.photos/seed/sushi/800/600',
};