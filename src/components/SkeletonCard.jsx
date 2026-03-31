import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard = ({ isLargeRow = false }) => {
    return (
        <div className={`${styles.skeletonCard} ${isLargeRow ? styles.skeletonCardLarge : ''}`}>
            <div className={styles.shimmer}></div>
        </div>
    );
};

export default SkeletonCard;
