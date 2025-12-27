import React from "react";

export default class ButtonLike extends React.Component {
    render() {
        const { img, onLike, isLiked } = this.props;

        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onLike(img);
                }}
                className={`
        z-30 p-1 absolute left-17 top-3 px-4 rounded-md shadow hover:scale-110 transition text-2xl font-bold opacity-0 group-hover:opacity-100 text-white 
          ${isLiked ? 'bg-red-500' : 'bg-white/20'}
         
        `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /> </svg>
            </button>
        );
    }
}
