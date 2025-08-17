import React from 'react';
import type { League } from '../types';
import LeagueCard from './LeagueCard';

interface LeaguesListProps {
  leagues: League[];
  loading: boolean;
  error: string | null;
}

const LeaguesList: React.FC<LeaguesListProps> = ({ leagues, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-600">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg">Loading leagues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="inline-block bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-lg font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (leagues.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No leagues found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
        {leagues.map((league) => (
          <LeagueCard key={league.idLeague} league={league} />
        ))}
      </div>
    </div>
  );
};

export default LeaguesList;
