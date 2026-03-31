import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

// Create an Axios instance with base configuration
const omdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: API_KEY
    }
});

// Generic fetch function for lists
export const fetchMoviesList = async (searchQuery) => {
    try {
        const response = await omdbApi.get('', {
            params: {
                s: searchQuery,
                type: 'movie'
            }
        });

        if (response.data.Response === 'False') {
            console.warn(`OMDb API warning for query "${searchQuery}":`, response.data.Error);
            return [];
        }

        return response.data.Search || [];
    } catch (error) {
        console.error(`Error fetching list for query "${searchQuery}":`, error);
        return [];
    }
};

// Fetch full details for a specific movie by IMDb ID
export const fetchMovieDetails = async (imdbID) => {
    try {
        const response = await omdbApi.get('', {
            params: {
                i: imdbID,
                plot: 'full'
            }
        });

        if (response.data.Response === 'False') {
            console.warn(`OMDb API warning for details ID "${imdbID}":`, response.data.Error);
            return null;
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ID "${imdbID}":`, error);
        return null;
    }
};

// Simulated category endpoints using keywords
export const apiEndpoints = {
    trending: 'Avengers',
    netflixOriginals: 'Series', // Using "Series" since OMDb search is keyword based 
    topRated: 'Batman', // Simulating top rated with popular established franchise
    actionMovies: 'Action',
    comedyMovies: 'Comedy',
    horrorMovies: 'Horror',
    documentaries: 'Documentary',
};
