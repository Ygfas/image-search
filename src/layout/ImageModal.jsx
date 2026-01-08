import React from 'react';
import ButtonCard from '../util/ButtonCard';
import GlareHover from '../components/GlareHover'
import ElectricBorder from '../components/ElectricBorder'


class ImageModal extends React.Component {
    
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            isZoomed: false,
            highResLoaded: false
        };
        
    }

    componentDidUpdate(prevProps) {
       
        if (
            prevProps.image?.id &&
            this.props.image?.id &&
            prevProps.image.id !== this.props.image.id
        ) {
            this.setState({ isZoomed: false });
            this.containerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    toggleZoom = () => {
        this.setState(prevState => ({ isZoomed: !prevState.isZoomed }));
    }


    render() {
       
       
        const { image, onClose, relatedImages, onSelectRelated } = this.props;
        const { isZoomed } = this.state;
       


        if (!image) return null;

        return (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 group"
                    onClick={onClose}
                >
                
                
              



               
                <ElectricBorder className=''
                    color="cyan"
                    speed={0.6}
                    chaos={0.3}
                    thickness={4}
                    style={{ borderRadius: 0 }}>
                    <div ref={this.containerRef} className=" bg-white/40 rounded-md  w-full max-w-4xl shadow-2xl overflow-y-auto relative animate-fade-in-down max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                "
                        onClick={e => e.stopPropagation()}>



                        <div className="p-6">

                            <div className="bg-black/70 flex items-center justify-between mb-4 border-b-2 py-2 px-2 rounded-t-md">
                                <div className="flex items-center gap-3">
                                    <a
                                        href={image.user?.links?.html}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="z-50 relative"
                                    >
                                        <img
                                            src={image.user?.profile_image?.medium}
                                            alt={image.user?.name}
                                            className="w-10 h-10  border-2 border-white cursor-pointer hover:scale-110 transition"
                                        />
                                    </a>


                                    <div>
                                        <h2 className="text-lg font-bold text-white">{image.user?.name || 'Unknown Author'}</h2>
                                        <p className="text-xs text-white/65">@{image.user?.username}</p>
                                    </div>
                                </div>
                                <div className="text-white/90 text-sm italic ml-40">
                                    { image.alt_description || 'Untitled Image'}


                                </div>

                                <div className="ml-2 opacity-100 transition-opacity duration-300 z-20">

                                    <ButtonCard imageUrl={image.urls?.full} img={image}  filename={`unsplash-${image.id}.jpg `}
                                        onClick={this.handleDownload}

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="download">
                                            <path
                                                fill="#212121"
                                                d="M3.5,13 L12.5,13 C12.9142136,13 13.25,13.3357864 13.25,13.75 C13.25,14.1296958 12.9678461,14.443491 12.6017706,14.4931534 L12.5,14.5 L3.5,14.5 C3.08578644,14.5 2.75,14.1642136 2.75,13.75 C2.75,13.3703042 3.03215388,13.056509 3.39822944,13.0068466 L3.5,13 L12.5,13 L3.5,13 Z M7.89822944,1.00684662 L8,1 C8.37969577,1 8.69349096,1.28215388 8.74315338,1.64822944 L8.75,1.75 L8.75,9.438 L11.0052038,7.18413593 C11.2714703,6.91786937 11.688134,6.89366331 11.9817455,7.11151777 L12.065864,7.18413593 C12.3321305,7.45040249 12.3563366,7.86706617 12.1384821,8.16067767 L12.065864,8.2447961 L8.53033005,11.78033 C8.26406349,12.0465966 7.84739981,12.0708026 7.55378831,11.8529482 L7.46966988,11.78033 L3.93413597,8.2447961 C3.64124276,7.95190288 3.64124276,7.47702915 3.93413597,7.18413593 C4.20040254,6.91786937 4.61706622,6.89366331 4.91067771,7.11151777 L4.99479615,7.18413593 L7.25,9.44 L7.25,1.75 C7.25,1.37030423 7.53215388,1.05650904 7.89822944,1.00684662 L8,1 L7.89822944,1.00684662 Z"
                                            ></path>
                                        </svg>
                                    </ButtonCard>
                                </div>




                            </div>


                            <div
                                className={`w-full flex justify-center bg-gray-100 rounded-md overflow-hidden relative cursor-zoom-in transition-all duration-300 ${isZoomed ? 'h-auto' : 'h-[60vh]'}`}
                                onClick={this.toggleZoom}
                            >


                                <img
                                    src={image.urls?.regular}
                                    srcSet={`
                                        ${image.urls.small} 400w,
                                        ${image.urls.regular} 1080w
                                    `}
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    decoding="async"
                                    alt={image.alt_description}
                                    className={`object-contain transition-transform duration-300 
                                     ${isZoomed ? 'scale-140' : 'scale-100'}
                                        cursor-zoom-${isZoomed ? 'out' : 'in'}
                                    `}
                                />



                            </div>


                            <div className="mt-6 ">
                                <h3 className="font-bold text-white mb-3 text-lg border-l-4 border-white pl-2">Gambar Terkait {image.tags && image.tags[0] ? `(${image.tags[0].title})` : ''}</h3>
                                <div className='flex gap-4 justify-center items-center text-left font-mono mx-auto  '>
                                    {relatedImages.length === 0 ? (
                                        <p className="text-sm text-gray-400">Memuat gambar terkait...</p>
                                    ) : (
                                        <div className="columns-2  items-center w-full h-full">
                                            {relatedImages.slice(0, 20).map((relImg) => (
                                                <div key={relImg.id} className="">
                                                    <GlareHover
                                                        glareColor='ffffff'
                                                        glareOpacity={0.7}
                                                        glareAngle={-30}
                                                        glareSize={300}
                                                        transitionDuration={1500}
                                                        playOnce={false}>

                                                        <img
                                                            src={relImg.urls?.thumb}
                                                            loading="lazy"
                                                            decoding="async"
                                                            alt="Related"
                                                            className="w-full h-full object-cover  hover:cursor-pointer "

                                                            onClick={() => {

                                                                document.querySelector('.bg-white')?.scrollIntoView({ behavior: 'smooth' });

                                                                onSelectRelated(relImg);
                                                            }}
                                                        />
                                                    </GlareHover>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>



                        </div>




                    </div>
                </ElectricBorder>






            </div>
        );
    }
}

export default ImageModal;