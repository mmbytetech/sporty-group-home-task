import React, { useState } from 'react';
import type { League, Season } from '../types';
import { fetchSeasonBadge } from '../services/api';

interface LeagueCardProps {
  league: League;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const [season, setSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(false);
  const [badgeLoaded, setBadgeLoaded] = useState(false);

  const handleLeagueClick = async () => {
    if (season || loading) return;

    setLoading(true);
    try {
      const seasonData = await fetchSeasonBadge(league.idLeague);
      console.log(seasonData);
      setSeason(seasonData);
    } catch (error) {
      console.error('Error fetching season badge:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-500 hover:-translate-y-1 relative overflow-hidden group"
      onClick={handleLeagueClick}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{league.strLeague}</h3>
        <p className="text-blue-500 font-medium text-sm uppercase tracking-wide mb-1">{league.strSport}</p>
        {league.strLeagueAlternate && (
          <p className="text-gray-500 text-sm italic">{league.strLeagueAlternate}</p>
        )}
      </div>
      
      {loading && (
        <div className="text-blue-500 text-sm font-medium text-center py-4">Loading badge...</div>
      )}
      
      {season && season.strBadge && !loading && (
        <div className="text-center mt-4 pt-4 border-t border-gray-100">
          <img
            src={season.strBadge}
            alt={`${league.strLeague} badge`}
            className={`max-w-20 max-h-20 rounded-lg shadow-md mx-auto transition-opacity duration-300 ${badgeLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setBadgeLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <p className="text-xs text-gray-500 font-medium mt-2">{season.strSeason}</p>
        </div>
      )}
    </div>
  );
};

export default LeagueCard;
