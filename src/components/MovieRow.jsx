import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import styles from './MovieRow.module.css';

const MovieRow = ({ title, movies = [], isLargeRow = false }) => {
    const rowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth + 100
                : scrollLeft + clientWidth - 100;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const handleRowScroll = () => {
        if (rowRef.current) {
            setScrollPosition(rowRef.current.scrollLeft);
        }
    };

    return (
        <div
            className={styles.row}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className={styles.title}>{title || "Category Title"}</h2>
            <div className={styles.sliderContainer}>
                {isHovered && scrollPosition > 0 && (
                    <div
                        className={`${styles.sliderArrow} ${styles.leftArrow}`}
                        onClick={() => handleScroll("left")}
                    >
                        {'<'}
                    </div>
                )}
                <div
                    className={styles.posters}
                    ref={rowRef}
                    onScroll={handleRowScroll}
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isLargeRow={isLargeRow}
                        />
                    ))}
                </div>
                {isHovered && (
                    <div
                        className={`${styles.sliderArrow} ${styles.rightArrow}`}
                        onClick={() => handleScroll("right")}
                    >
                        {'>'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieRow;
