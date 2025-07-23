# Hacker News Clone

A responsive clone of Hacker News built with React, featuring real-time data from the official Hacker News API.

## Technology Stack

- **Frontend**: React 18, React Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: Hacker News Firebase API

## Getting Started

### Requirements

- Node.js v22.13.1
- npm v10.9.2

### Installation

1. Clone the repository:

```bash
git clone <your-public-repo-url>
cd hacker-news-clone
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

### Build for Production

To build the app for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── Header.jsx          # Main navigation header
│   ├── StoryCard.jsx       # Individual story display
│   ├── FilterSidebar.jsx   # Advanced filtering options
│   └── ...
├── pages/                  # Page components
│   ├── HomePage.jsx        # Main stories listing
│   └── StoryPage.jsx       # Individual story view
├── hooks/                  # Custom React hooks
│   ├── useAuth.js          # Authentication logic
│   ├── useStories.js       # Stories data management
│   ├── useFilters.js       # Filtering logic
│   └── ...
├── api/                    # API integration
│   └── hackerNews.js       # Hacker News API client
└── ...
```

## Key Features

### Story Management

- Fetches and caches stories from Hacker News API
- Supports all story types (top, new, best, ask, show, jobs)
- Pagination with prefetching for smooth navigation
- Real-time score and comment count updates

### Search & Filtering

- Debounced search across story titles and authors
- Time-based filtering (day, week, month, year)
- Score threshold filtering
- Multiple sorting options (score, time, comments)
- Persistent filter state

### User Experience

- Responsive design for all screen sizes
- Loading states and error handling
- Smooth animations and transitions
- Keyboard navigation support
- Accessible UI components

### Performance

- Intelligent caching strategy
- Lazy loading of comments
- Optimized re-renders with React hooks
- Prefetching of next page data

## API Integration

The app integrates with the official Hacker News API:

- **Base URL**: [https://github.com/HackerNews/API](https://github.com/HackerNews/API)

## Acknowledgments

- [Hacker News](https://news.ycombinator.com/) for the API and inspiration
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons
