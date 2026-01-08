import React from 'react';
import ButtonDownload from '../util/ButtonDownload.jsx';
import ButtonLike from '../util/ButtonLike.jsx';
import ButtonBookmark from '../util/ButtonBookmark.jsx';
import ClickSpark from '../components/ClickSpark.jsx';
import memoize from 'memoize-one';


class ImageGallery extends React.Component {
    getLikedSet = memoize((likedImages) => new Set(likedImages.map(i => i.id)));
    getBookmarkedSet = memoize((bookmarkedImages) => new Set(bookmarkedImages.map(i => i.id)));

    render() {

        const {
            images,
            onImageClick,
            onLike,
            onBookmark,
            likedImages,
            bookmarkedImages,
            disableClick = false
        } = this.props;
       
        const likedSet = this.getLikedSet(likedImages);
        const bookmarkedSet = this.getBookmarkedSet(bookmarkedImages);

        return (
            <div className="flex flex-wrap gap-4 px-7 text-left font-mono mx-auto justify-evenly">
                <div className="columns-2 sm:columns-2 lg:columns-5 gap-4 mb-30">

                    {images.map((img) => (
                        <div key={img.id} className="card bg-base-100 mb-4 break-inside-avoid">
                            <figure className='relative group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300'>


                                <img
                                    src={img.urls?.full}
                                    srcSet={`
                                        ${img.urls.small} 400w,
                                        ${img.urls.regular} 800w
                                    `}
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                    loading="lazy"
                                    decoding="async"


                                    onClick={() => {
                                        if (!disableClick && onImageClick) {
                                            onImageClick(img)
                                        }
                                    }}
                                    className={`w-full h-full object-cover transition-transform duration-300 
                                            ${!disableClick ? 'cursor-pointer group-hover:scale-105' : 'cursor-default'}
                                            `}


                                />


                                <div
                                    className="w-full absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                </div>
                                <ButtonLike
                                    img={img}
                                    onLike={onLike}
                                    isLiked={likedSet.has(img.id)}
                                />

                                <ButtonBookmark
                                    img={img}
                                    onBookmark={onBookmark}
                                    isBookmarked={bookmarkedSet.has(img.id)}
                                />

                                <ButtonDownload
                                    imageUrl={img.urls.full}
                                    img={img}
                                    
                                    filename={`unsplash-${img.alt_description}.jpg`}
                                />

                                <div className="z-10 absolute w-full bottom-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                    <div
                                        className="flex items-center gap-3 bg-black/50  p-2 rounded-lg text-white max-w-full "
                                        onClick={() => onImageClick(img)}>


                                        <a
                                            href={img.user?.links?.html}
                                            target="_blank"
                                            className="z-50 relative"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <img
                                                src={img.user?.profile_image?.medium}
                                                alt="Avatar"
                                                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white object-cover"
                                            />
                                        </a>



                                        <div className="flex flex-col leading-tight">
                                            <h1 className="text-md sm:text-base font-semibold truncate">
                                                {img.user?.name || 'Unknown Author'}
                                            </h1>
                                            <h4 className="text-sm sm:text-sm text-gray-200 truncate">
                                                @{img.user?.username}
                                            </h4>
                                            <p className='text-gray-300 text-xs'>
                                             
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ImageGallery;