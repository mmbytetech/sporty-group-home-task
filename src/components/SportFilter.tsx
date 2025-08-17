import React from 'react';

interface SportFilterProps {
  sports: string[];
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

const SportFilter: React.FC<SportFilterProps> = ({ sports, selectedSport, onSportChange }) => {
  return (
    <div className="min-w-48">
      <select
        value={selectedSport}
        onChange={(e) => onSportChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 bg-white cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
      >
        <option value="">All Sports</option>
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportFilter;
