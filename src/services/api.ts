import type { League, LeaguesResponse, Season, SeasonsResponse } from '../types';

const cache = new Map<string, unknown>();

const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const getCachedData = (key: string): unknown | null => {
  const entry = cache.get(key) as CacheEntry;
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key: string, data: unknown): void => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

export const fetchAllLeagues = async (): Promise<League[]> => {
  const cacheKey = 'all_leagues';
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData as League[];
  }

  try {
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: LeaguesResponse = await response.json();
    const leagues = data.leagues || [];
    
    setCachedData(cacheKey, leagues);
    return leagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw new Error('Failed to fetch leagues');
  }
};

export const fetchSeasonBadge = async (leagueId: string): Promise<Season | null> => {
  const cacheKey = `season_badge_${leagueId}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData as Season | null;
  }

  try {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SeasonsResponse = await response.json();
    const season = data.seasons?.[0] || null;
    
    setCachedData(cacheKey, season);
    return season;
  } catch (error) {
    console.error('Error fetching season badge:', error);
    return null;
  }
};
