import React, { memo } from 'react';
import { useHoverDelay } from '../hooks/useHoverDelay';
import { useMovies } from '../context/MoviesContext';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, isLargeRow }) => {
    const { isHovered, onMouseEnter, onMouseLeave } = useHoverDelay(500);
    const { openModal } = useMovies();

    if (!movie) return null;

    const imageUrl = isLargeRow ? movie.posterImage : movie.heroImage;

    return (
        <div
            className={`${styles.cardContainer} ${isLargeRow ? styles.cardLarge : ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => openModal(movie)}
        >
            <img
                src={imageUrl}
                alt={movie.title}
                className={styles.cardImage}
                loading="lazy"
            />
            {isHovered && (
                <div className={styles.cardHover}>
                    <img
                        src={movie.heroImage}
                        alt={movie.title}
                        className={styles.hoverImage}
                    />
                    <div className={styles.hoverInfo}>
                        <div className={styles.actions}>
                            <button className={styles.playBtn} onClick={(e) => { e.stopPropagation(); }}>▶</button>
                            <button className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); }}>+</button>
                            <button className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); }}>👍</button>
                            <button className={styles.expandBtn} onClick={(e) => { e.stopPropagation(); openModal(movie); }}>v</button>
                        </div>
                        <div className={styles.metadata}>
                            <span className={styles.match}>{movie.matchPercentage}% Match</span>
                            <span className={styles.age}>{movie.ageRating}</span>
                            <span>{movie.duration}</span>
                        </div>
                        <div className={styles.genre}>
                            <span>{movie.title}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(MovieCard);
