import React from "react"
export default class ButtonBookmark extends React.Component {


    render() {
        const { img, onBookmark, isBookmarked } = this.props;
        return (
           

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(img);
                    }}
                    className={`z-30 p-1 absolute left-2 top-3 px-4 rounded-md shadow hover:scale-110 transition text-2xl font-bold opacity-0 group-hover:opacity-100 text-white  ${isBookmarked ? 'bg-yellow-400' : 'bg-white/20'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>


                </button>

          
        );
    }
}
