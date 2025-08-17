# Sports Leagues Explorer

A responsive React application that displays sports leagues from around the world using TheSportsDB API. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **League Discovery**: Browse and explore sports leagues from various sports
- **Smart Search**: Filter leagues by name (searches both main and alternate names)
- **Sport Filtering**: Filter leagues by specific sport types via dropdown
- **Interactive Cards**: Click on any league card to load and display season badges
- **Response Caching**: API responses are cached for 5 minutes to optimize performance
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mmbytetech/sporty-group-home-task.git
cd sporty-group-home-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 API Integration

### Endpoints Used
- **All Leagues**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Season Badges**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`

### Caching Strategy
- In-memory caching with 5-minute expiration
- Prevents unnecessary API calls
- Improves user experience and reduces server load

## 🎯 User Experience

1. **Initial Load**: Application fetches all leagues and displays them in a responsive grid
2. **Search**: Users can type to filter leagues by name (real-time filtering)
3. **Filter**: Dropdown allows filtering by specific sports
4. **Interaction**: Clicking any league card loads its season badge
5. **Feedback**: Loading states and error handling provide clear user feedback

## 🚀 Performance Optimizations

- **React.useMemo**: Optimized filtering and sport list generation
- **API Caching**: Reduces redundant network requests
- **Lazy Loading**: Season badges only load when requested
- **Efficient Rendering**: Minimal re-renders with proper dependency arrays
