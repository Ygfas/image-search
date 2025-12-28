
import React from 'react';
import './style/App.css';
import ImageService from './api/ImageService';
import SearchBar from './layout/SearchBar';
import ImageGallery from './layout/ImageGallery';
import Pagination from './layout/Pagination';
import ClickSpark from './components/ClickSpark';
import ImageModal from './layout/ImageModal';
import Aurora from './components/Aurora';
import GradualBlur from './components/GradualBlur';
import SplashCursor from './components/SplashCursor'
import TextCursor from './components/TextCursor'
import { Container } from 'lucide-react';
import { Token1, Token2, Token3 } from './api/ApiKey';
import Ribbons from './components/Ribbons';
import Balatro from './components/Balatro';
import FuzzyText from './components/FuzzyText'
import TextType from './components/TextType'
import FallingText from './components/FallingText';
import { VscHome, VscArchive, VscAccount, VscSettingsGear, VscBookmark } from "react-icons/vsc";
import { FaRedo } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import GlassSurface from './components/GlassSurface'
import LogoLoop from './components/LogoLoop';
import { SiReact, SiGithub, SiShadcnui, SiUnsplash,SiVite, SiTailwindcss } from 'react-icons/si';
import SpotlightCard from './components/SpotlightCard'

import Dock from './components/Dock';




const ACCESS_KEY = new Token2()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.imageService = new ImageService(ACCESS_KEY.getApiKey());
    this.state = {
      images: [],
      query: '',
      page: 1,
      filter: '',
      mode: 'random',
      randomHistory: [],
      error: '',
      selectedImage: null,
      relatedImages: [],
      fallingTriggered: false,
      likedImages: [],        // list image object
      bookmarkedImages: [],  // list image object
      activeDockPanel: null,
      // 'l

    };
  }

  componentDidMount() {
    this.loadRandomImages(1);
    const savedLikes = localStorage.getItem("likedImages");
    const savedBookmarks = localStorage.getItem("bookmarkedImages");

    this.setState({
      likedImages: savedLikes ? JSON.parse(savedLikes) : [],
      bookmarkedImages: savedBookmarks ? JSON.parse(savedBookmarks) : [],
    });
  }

  async loadRandomImages(page = 1) {
    const images = await this.imageService.getRandomImages();
    this.setState(prev => {
      const updatedHistory = [...prev.randomHistory];
      updatedHistory[page - 1] = images;
      return {
        images,
        randomHistory: updatedHistory,
        page,
        mode: 'random'
      };
    });
  }


  handleImageClick = async (image) => {

    this.setState({ selectedImage: image, fallingTriggered: false });


    if (image.tags && image.tags.length > 0) {

      const tag = image.tags[9].title;
      try {

        const results = await this.imageService.searchImages(tag, 1);
        const filteredRelated = results.filter(img => img.id !== image.id);
        this.setState({ relatedImages: filteredRelated });
      } catch (error) {
        console.error("Gagal ambil related image", error);
      }
    } else {

      const fallbackRelated = this.state.images.filter(img => img.id !== image.id);
      this.setState({ relatedImages: fallbackRelated });
    }
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null, relatedImages: [] });
  };


  handleSearch = async (query) => {
    this.resetFallingText();
    const images = await this.imageService.searchImages(query, 1);
    this.setState({
      images,
      query,
      page: 1,
      filter: '',
      mode: 'search',
      error: images.length === 0 ? 'Error 404.' : ''
    });
  };

  handleFilter = async (filter) => {
    this.resetFallingText();
    const images = await this.imageService.searchImages(filter, 1);
    this.setState({
      images,
      filter,
      query: '',
      page: 1,
      mode: 'filter',
      error: images.length === 0 ? 'Tidak ada gambar untuk kategori ini.' : ''
    });
  };
  handlePageChange = async (direction) => {
    const newPage = this.state.page + direction;
    if (newPage < 1) return;

    const { mode, query, filter, randomHistory } = this.state;

    if (mode === 'random') {
      if (randomHistory[newPage - 1]) {
        this.setState({
          images: randomHistory[newPage - 1],
          page: newPage
        });
      } else {
        await this.loadRandomImages(newPage);
      }
    } else {
      const searchTerm = query || filter;
      const images = await this.imageService.searchImages(searchTerm, newPage);
      this.setState({ images, page: newPage });
    }

  };


  componentDidUpdate(prevProps, prevState) {
    if (prevState.likedImages !== this.state.likedImages) {
      localStorage.setItem("likedImages", JSON.stringify(this.state.likedImages));
    }
    if (prevState.bookmarkedImages !== this.state.bookmarkedImages) {
      localStorage.setItem("bookmarkedImages", JSON.stringify(this.state.bookmarkedImages));
    }
  }

  // 3. Logika Toggle Like (Tambah jika belum ada, hapus jika sudah ada)
  toggleLike = (img) => {
    this.setState((prevState) => {
      const isExist = prevState.likedImages.find((i) => i.id === img.id);
      if (isExist) {
        // Hapus dari list
        return { likedImages: prevState.likedImages.filter((i) => i.id !== img.id) };
      } else {
        // Tambah ke list
        return { likedImages: [...prevState.likedImages, img] };
      }
    });
  };

  // 4. Logika Toggle Bookmark
  toggleBookmark = (img) => {
    this.setState((prevState) => {
      const isExist = prevState.bookmarkedImages.find((i) => i.id === img.id);
      if (isExist) {
        return { bookmarkedImages: prevState.bookmarkedImages.filter((i) => i.id !== img.id) };
      } else {
        return { bookmarkedImages: [...prevState.bookmarkedImages, img] };
      }
    });
  };



  componentWillUnmount() {
    document.body.style.overflow = '';
  }
  resetFallingText = () => {
    this.setState({ fallingTriggered: false });
  };



  render() {

    const items = [

      { icon: <VscHome size={18} color='white' />, label: 'Home', onClick: () => window.location.href = '/' },
      // { icon: <VscArchive size={18} color='white' />, label: 'Archive', onClick: () => alert('Archive!') },
      // { icon: <VscAccount size={18} color='white' />, label: 'Profile', onClick: () => alert('Profile!') },
      // { icon: <VscSettingsGear size={18} color='white' />, label: 'Settings', onClick: () => alert('Settings!') },
      {
        icon: <VscBookmark color='white' size={18} />,
        label: 'Bookmark',
        onClick: () => this.setState({ activeDockPanel: 'bookmark', fallingTriggered: false })
      },
      {
        icon: <IoHeartOutline size={18} color='white' />,
        label: 'Liked',
        onClick: () => this.setState({ activeDockPanel: 'like', fallingTriggered: false })
      },
      { icon: <FiArrowUp size={18} color='white' />, label: 'PageUp', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      {
        icon: <FiArrowDown size={18} color='white' />, label: 'PageDown', onClick: () => window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }
    ]
    const techLogos = [
      { node: <SiReact color='white'/>, title: "React", href: "https://react.dev" },
      { node: <SiTailwindcss color='white'/>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
      { node: <SiGithub color='white' />, title: 'Github', href:'https://github.com/Ygfas/'},
      { node: <SiUnsplash color='white' />, title: 'Unsplash', href:'https://unsplash.com/id'},
      { node: <SiShadcnui color='white' />, title: 'ShadCn', href:'https://ui.shadcn.com/'},
      { node: <SiVite color='white' />, title: 'Vite', href:'https://vite.dev/'},
     
    ];
    // const relatedImages = this.state.images.filter(img => img.id !== this.state.selectedImage?.id);
    return (
      <>



        <div className="my-0 mx-auto w-full justify-center ">

          <div className="fixed inset-0 -z-10">
            {/* <Aurora

              colorStops={['cyan', '#15f4ee', 'cyan']}
              amplitude={1}
              blend={0.9}
            /> */}
            <Balatro
              isRotate
              spinRotation={1}




            />




          </div>


          <ClickSpark
            sparkColor='#fff'
            sparkSize={50}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >


            <section className="relative min-h-screen">


              <div className="px-2 py-8">




                <div
                  className="relative  h-[125px] mb-5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!this.state.fallingTriggered) {
                      this.setState({ fallingTriggered: true });
                    }
                  }}
                >
                  <FallingText
                    key={this.state.fallingTriggered ? 'floating' : 'fell'}
                    text="Selamat Datang di PictMe, Cari Gambar dan Download Gambar Gratis Ga Bikin Ribet tinggal Click"
                    highlightWords={["Selamat", "PictMe", "Gratis", "Click", "Ribet", "Download"]}
                    trigger={this.state.fallingTriggered ? "auto" : "none"}
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    fontSize="clamp(1.5rem, 4vw, 3rem)"
                    mouseConstraintStiffness={0.1}
                  />
                </div>


                <SearchBar onSearch={this.handleSearch} onFilterClick={this.handleFilter} />
                {this.state.error && (
                  <div className="flex justify-center mt-50">
                    <FuzzyText
                      baseIntensity={0}
                      enableHover={true}
                      hoverIntensity={0.3}

                    >
                      {this.state.error}
                    </FuzzyText>
                  </div>
                )}

                {this.state.selectedImage && (
                  <ImageModal
                    image={this.state.selectedImage}
                    relatedImages={this.state.relatedImages}
                    onClose={this.handleCloseModal}



                    onSelectRelated={this.handleImageClick}

                  />
                )}

                <ImageGallery
                  images={this.state.images}
                  onImageClick={this.handleImageClick}

                  onLike={this.toggleLike}
                  onBookmark={this.toggleBookmark}
                  likedImages={this.state.likedImages}
                  bookmarkedImages={this.state.bookmarkedImages}

                />
                <LogoLoop
              
                
                  logos={techLogos}
                  speed={120}
                  direction="left"
                  logoHeight={48}
                  gap={40}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="cyan"
                  ariaLabel="Technology partners"
                />


              


              </div>
              
              <div className='h-24'></div>
              <Dock
                className="fixed bottom-30 left-1/2 -translate-x-1/2 z-40"
                items={items}
                panelHeight={45}
                baseItemSize={30}
                magnification={50}

              />

              {this.state.activeDockPanel && (
                <>

                  <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
                    onClick={() => this.setState({ activeDockPanel: null })}

                  />
                 

                  <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-h-[85%] from-neutral-500 to-cyan-300 rounded-xl shadow-2xl z-30 flex flex-col overflow-hidden">


                    <div className="flex justify-between items-center p-4 border-b bg-white shrink-0">
                      <TextType
                        key={this.state.activeDockPanel}
                        as="h2"
                        text={
                          this.state.activeDockPanel === 'like'
                            ? ["Liked Images", "Your Favorites ❤️"]
                            : ["Bookmarked Images", "Saved for Later 🔖"]
                        }
                        typingSpeed={100}
                        pauseDuration={2000}
                        className="font-bold text-2xl text-black"
                        cursorClassName="text-blue-500"
                      />
                      <button
                        onClick={() => this.setState({ activeDockPanel: null })}
                        className="text-2xl font-bold hover:scale-110 transition text-black p-2"
                      >
                        ×
                      </button>
                    </div>

                    {/* Content Area */}
                    <SpotlightCard
                    spotlightColor='cyan'
                    className='bg-white/10'>

                    <div className="overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {(
                        this.state.activeDockPanel === 'like'
                          ? this.state.likedImages.length === 0
                          : this.state.bookmarkedImages.length === 0
                      ) ? (
                        <div className="flex justify-center items-center text-slate-400 py-30">
                          <TextType
                            key={this.state.activeDockPanel}
                            as="h2"
                            text={
                              this.state.activeDockPanel === 'like'
                                ? ['Belum ada gambar yang di-like ❤️', 'Cari dan tambahkan Like ❤️']
                                : ['Belum ada gambar yang di-bookmark 🔖', 'Cari dan Tambahkan Bookmark 🔖']
                            }
                            typingSpeed={100}
                            pauseDuration={2000}
                            className="font-bold text-md text-white/60"
                            cursorClassName="text-blue-500"
                          />
                        </div>
                      ) : (
                        <div className="p-4">
                          <ImageGallery
                            images={
                              this.state.activeDockPanel === 'like'
                                ? this.state.likedImages
                                : this.state.bookmarkedImages
                            }
                            disableClick={true} // Mematikan klik pada gallery di dalam panel
                            onLike={this.toggleLike}
                            onBookmark={this.toggleBookmark}
                            likedImages={this.state.likedImages}
                            bookmarkedImages={this.state.bookmarkedImages}
                          />
                        </div>
                      )}
                    </div>
                    </SpotlightCard>
                    
                  </div>
                </>
              )}




              <GradualBlur
                target="page"   // 🔥 WAJIB
                position="bottom"
                height="3.5rem"
                strength={5}
                divCount={6}
                curve="linear"
                exponential
                opacity={1}
                className="pointer-events-none"
              />



              <div className=" bottom-12 w-full flex justify-center z-10 fixed">

                <Pagination page={this.state.page} onPageChange={this.handlePageChange} />
              </div>

            </section>







          </ClickSpark>
          <div className="fixed inset-0 z-50 pointer-events-none">

            <Ribbons
              colors={['white','cyan']}
              baseThickness={30}

              effectAmplitude={0.7}
              speedMultiplier={0.3}
              maxAge={400}
              backgroundColor={[0, 0, 0, 0]}
              enableFade={true}
              enableShaderEffect={true}
            />
            
          </div>




        </div>


      </>


    );
  }

}

export default App;

