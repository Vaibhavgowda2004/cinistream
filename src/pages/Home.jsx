import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { useMovies } from '../context/MoviesContext';
import { fetchMoviesList, apiEndpoints } from '../services/api';

const Home = () => {
    const {
        setFeaturedMovie,
        setMoviesByCategory,
        setLoading,
        moviesByCategory,
        loading
    } = useMovies();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                // Map over API endpoints and fetch movies for each keyword
                const categoryKeys = Object.keys(apiEndpoints);

                const results = await Promise.all(
                    categoryKeys.map((key) => fetchMoviesList(apiEndpoints[key]))
                );

                const fetchedMovies = {};
                categoryKeys.forEach((key, index) => {
                    const categoryName = key.replace(/([A-Z])/g, ' $1').trim();
                    const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

                    const rawMovies = results[index];

                    // Map OMDb data structure to what our app components expect
                    fetchedMovies[formattedCategoryName] = rawMovies.map(movie => ({
                        id: movie.imdbID,
                        title: movie.Title,
                        description: 'A great movie worth watching!', // Defaulting since simple search doesn't give plot
                        matchPercentage: Math.floor(Math.random() * 40) + 60, // Simulate match % until we fetch details
                        posterImage: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
                        heroImage: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1200x600?text=No+Backdrop', // OMDb lacks backdrop natively
                        year: movie.Year
                    }));
                });

                setMoviesByCategory(fetchedMovies);

                // Set featured movie from Trending (which maps to Avengers currently)
                if (fetchedMovies['Trending'] && fetchedMovies['Trending'].length > 0) {
                    setFeaturedMovie(fetchedMovies['Trending'][0]);
                }
            } catch (err) {
                console.error("Failed to load movies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [setFeaturedMovie, setMoviesByCategory, setLoading]);

    return (
        <div style={{ backgroundColor: '#141414', minHeight: '100vh', paddingBottom: '20px' }}>
            <Navbar />
            <Hero />
            <div style={{ marginTop: '-150px', position: 'relative', zIndex: 10 }}>
                {loading ? (
                    // Load some skeleton rows if data is fetching
                    Array.from({ length: 4 }).map((_, i) => (
                        <MovieRow
                            key={`skeleton-${i}`}
                            title="Loading..."
                            isLargeRow={i === 0}
                            loading={true}
                        />
                    ))
                ) : (
                    Object.keys(moviesByCategory).map((category) => (
                        <MovieRow
                            key={category}
                            title={category}
                            isLargeRow={category === "Netflix originals"}
                            movies={moviesByCategory[category]}
                            loading={false}
                        />
                    ))
                )}
            </div>
            <Footer />
            <Modal />
        </div>
    );
};

export default Home;
