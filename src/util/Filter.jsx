// components/FilterBar.js
import React from 'react';

const filters = [
    'Featured', 'Nature', 'Abstract', 'Technology', 'Cyberpunk', 'Anime', 'People',
    'Wallpaper', 'Street Food', 'Cartoon', 'Natural', 'City', 'Space', 'Animals',
    'Fantasy', 'Minimalist', 'Robot', 'Texture', 'Architecture', 'Street Photography'
];

const Filter = ({ onFilterClick }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 my-4 z-40">
            {filters.map((filter, i) => (
                <button
                    key={i}
                    onClick={() => onFilterClick(filter)}
                    className="hover:bg-white/50 text-white font-semibold py-1 px-3 rounded-full text-sm underline bg-white/15 shadow-lg"
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default Filter;