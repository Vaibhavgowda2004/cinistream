import React, { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [moviesByCategory, setMoviesByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMovie(null), 300); // clear after fade out
    };

    const value = {
        featuredMovie,
        setFeaturedMovie,
        moviesByCategory,
        setMoviesByCategory,
        loading,
        setLoading,
        error,
        setError,
        selectedMovie,
        isModalOpen,
        openModal,
        closeModal
    };

    return (
        <MoviesContext.Provider value={value}>
            {children}
        </MoviesContext.Provider>
    );
};
