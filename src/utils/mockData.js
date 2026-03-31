export const getMockMovies = (category) => {
    return Array.from({ length: 20 }, (_, i) => ({
        id: `${category}-${i}`,
        title: `${category.replace(/([A-Z])/g, ' $1').trim()} Movie ${i + 1}`,
        description: `This is a description for ${category} Movie ${i + 1}. It is an exciting watch full of twists and turns.`,
        matchPercentage: Math.floor(Math.random() * 40) + 60, // 60-99%
        ageRating: ['13+', '16+', '18+', 'All'][Math.floor(Math.random() * 4)],
        duration: ['1h 30m', '2h 15m', '45m', '1h 50m'][Math.floor(Math.random() * 4)],
        posterImage: `https://picsum.photos/seed/${category}${i}/300/450`,
        heroImage: `https://picsum.photos/seed/${category}${i}hero/1200/600`,
    }));
};
