import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { useMovies } from '../context/MoviesContext';

const Hero = () => {
    const { moviesByCategory, openModal, loading } = useMovies();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const movies = moviesByCategory["Trending"] || [];

    useEffect(() => {
        if (movies.length === 0) return;

        const intervalId = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % Math.min(movies.length, 5));
                setIsFading(false);
            }, 500);
        }, 8000);

        return () => clearInterval(intervalId);
    }, [movies]);

    if (loading || movies.length === 0) {
        return <div className={styles.hero} style={{ backgroundColor: '#111' }}></div>;
    }

    const currentMovie = movies[currentIndex];

    return (
        <div
            className={`${styles.hero} ${isFading ? styles.fadeOut : styles.fadeIn}`}
            style={{ backgroundImage: `url(${currentMovie.heroImage})` }}
        >
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>{currentMovie.title}</h1>
                <div className={styles.heroDescription}>
                    {currentMovie.description && currentMovie.description.length > 150
                        ? `${currentMovie.description.substring(0, 150)}...`
                        : currentMovie.description}
                </div>
                <div className={styles.heroButtons}>
                    <button className={`${styles.button} ${styles.playButton}`}>
                        ▶ Play
                    </button>
                    <button
                        className={`${styles.button} ${styles.moreInfoButton}`}
                        onClick={() => openModal(currentMovie)}
                    >
                        ℹ More Info
                    </button>
                </div>
            </div>
            <div className={styles.heroFadeLeft} />
            <div className={styles.heroFadeBottom} />
        </div>
    );
};

export default Hero;
