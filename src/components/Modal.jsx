import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMovies } from '../context/MoviesContext';
import { fetchMovieDetails } from '../services/api';
import styles from './Modal.module.css';

const Modal = () => {
    const { isModalOpen, closeModal, selectedMovie } = useMovies();
    const [movieDetails, setMovieDetails] = React.useState(null);
    const [loadingDetails, setLoadingDetails] = React.useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';

            // Fetch comprehensive details for the selected movie
            if (selectedMovie?.id) {
                setLoadingDetails(true);
                fetchMovieDetails(selectedMovie.id).then(data => {
                    setMovieDetails(data);
                    setLoadingDetails(false);
                });
            }
        } else {
            setMovieDetails(null); // Reset details when closed
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen, closeModal, selectedMovie]);

    if (!isModalOpen || !selectedMovie) return null;

    return createPortal(
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={closeModal}>×</button>
                <div
                    className={styles.heroSection}
                    style={{ backgroundImage: `url(${selectedMovie.heroImage})` }}
                >
                    <div className={styles.heroFadeBottom} />
                </div>
                <div className={styles.details}>
                    <h2>{selectedMovie.title}</h2>
                    <div className={styles.metadata}>
                        <span className={styles.match}>
                            {movieDetails ? `${parseFloat(movieDetails.imdbRating || 0) * 10}% Match` : `${selectedMovie.matchPercentage}% Match`}
                        </span>
                        <span className={styles.age}>{movieDetails?.Rated || 'N/A'}</span>
                        <span>{movieDetails?.Runtime || 'N/A'}</span>
                        <span className={styles.hd}>HD</span>
                    </div>

                    {loadingDetails ? (
                        <div style={{ color: "white", padding: "20px 0" }}>Loading full details...</div>
                    ) : (
                        <>
                            <p className={styles.description}>
                                {movieDetails?.Plot || selectedMovie.description}
                            </p>
                            <div style={{ color: "#777", fontSize: '0.9rem', marginBottom: '15px' }}>
                                <strong>Genres:</strong> {movieDetails?.Genre || 'N/A'} <br />
                                <strong>Director:</strong> {movieDetails?.Director || 'N/A'} <br />
                                <strong>Cast:</strong> {movieDetails?.Actors || 'N/A'} <br />
                                <strong>Awards:</strong> {movieDetails?.Awards !== "N/A" ? movieDetails?.Awards : "None"} <br />
                            </div>
                        </>
                    )}

                    <div className={styles.actions}>
                        <button className={`${styles.btn} ${styles.playBtn}`}>▶ Play</button>
                        <button className={`${styles.btn} ${styles.iconBtn}`}>+</button>
                        <button className={`${styles.btn} ${styles.iconBtn}`}>👍</button>
                        {selectedMovie?.id && (
                            <a
                                href={`https://www.imdb.com/title/${selectedMovie.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.btn} ${styles.playBtn}`}
                                style={{ backgroundColor: '#f5c518', color: 'black', marginLeft: '10px' }}
                            >
                                View on IMDb
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
