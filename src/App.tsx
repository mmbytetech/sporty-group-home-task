import { useState, useEffect, useMemo } from 'react';
import type { League } from './types';
import { fetchAllLeagues } from './services/api';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import LeaguesList from './components/LeaguesList';
import './App.css';

function App() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        setLoading(true);
        const data = await fetchAllLeagues();
        setLeagues(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadLeagues();
  }, []);

  const uniqueSports = useMemo(() => {
    const sports = leagues.map(league => league.strSport).filter(Boolean);
    return [...new Set(sports)].sort();
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    return leagues.filter(league => {
      const matchesSearch = !searchTerm || 
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (league.strLeagueAlternate && league.strLeagueAlternate.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSport = !selectedSport || league.strSport === selectedSport;
      
      return matchesSearch && matchesSport;
    });
  }, [leagues, searchTerm, selectedSport]);

  return (
    <div className="w-full mx-auto p-4 min-h-screen bg-gray-50">
      <header className="text-center mb-8 p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-shadow">Sports Leagues Explorer</h1>
        <p className="text-lg opacity-90">Discover sports leagues from around the world</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-center justify-center">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <SportFilter 
          sports={uniqueSports}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
        />
      </div>

      <div className="text-center mb-6">
        {!loading && !error && (
          <p className="text-gray-600 text-sm">Showing {filteredLeagues.length} of {leagues.length} leagues</p>
        )}
      </div>

      <LeaguesList 
        leagues={filteredLeagues}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
