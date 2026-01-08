import React from 'react';
import App from '../App'
import FluidGlass from '../components/FluidGlass';
import StarBorder from '../components/StarBorder'
import TextType from '../components/TextType';
import Filter from '../util/Filter'

// const filters = [
//     'Featured','Nature', 'Abstract', 'Technology', 'Cyberpunk', 'Anime','People','Wallpaper','Street Food','Cartoon','Natural',
//     'City', 'Space', 'Animals', 'Fantasy', 'Minimalist', 'Robot','Texture','Architecture','Street Photography'
// ];

class SearchBar extends React.Component {
    wrapperRef = React.createRef();

    state = {
        history: [],
        showHistory: false,
        query: '',
    };

    componentDidMount() {
        window.addEventListener('scroll', this.hideHistory);
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('keydown', this.handleEsc);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hideHistory);
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleEsc);
    }

    hideHistory = () => {
        this.setState({ showHistory: false });
    };

    handleEsc = (e) => {
        if (e.key === 'Escape') {
            this.hideHistory();
        }
    };

    handleClickOutside = (e) => {
        if (
            this.wrapperRef.current &&
            !this.wrapperRef.current.contains(e.target)
        ) {
            this.hideHistory();
        }
    };

    handleChange = (e) => {
        this.setState({
            query: e.target.value,
            showHistory: true,
        });
    };

    handleFocus = () => {
        this.setState({ showHistory: true });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const value = this.state.query.trim();
            if (!value) return;

            this.setState((prev) => ({
                history: [
                    value,
                    ...prev.history.filter((h) => h !== value),
                ].slice(0, 10),
                showHistory: true,
            }));

            this.props.onSearch(value);
        }
    };

    removeHistoryItem = (index) => {
        this.setState((prev) => ({
            history: prev.history.filter((_, i) => i !== index),
        }));
    };

    selectHistory = (value) => {
        this.setState({
            query: value,
            showHistory: false,
        });
        this.props.onSearch(value);
    };


    render() {
        const { history, showHistory, query } = this.state;

        return (
            <div
                ref={this.wrapperRef}
                className="container justify-center mx-auto relative"
            >

                {/* FILTER */}
                <Filter onFilterClick={this.props.onFilterClick} />


                {/* SEARCH BAR */}
                <div className="w-[90%] sm:w-full my-2 mx-auto flex bg-white/50 p-5 pl-3 rounded-full h-10 shadow-md items-center">
                    <input
                        type="search"
                        placeholder="Cari Gambar"
                        value={query}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocus}
                        className="w-full ml-2 mr-2 focus:outline-none focus:ring-0 text-white font-semibold text-xl "
                    />
                </div>

                {/* HISTORY PANEL */}
                {showHistory && history.length > 0 && (
                    <div className="flex justify-center my-3 z-40 absolute w-full">
                        <div className="flex flex-col bg-white w-11/12 shadow-md rounded-sm max-h-52 overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                            {/* HEADER */}
                            <div className="sticky top-0 flex  justify-between items-center px-3 py-2 border-b bg-slate-200 border-neutral-600">
                                
                                <TextType
                                    key={this.state.activeDockPanel} // Penting: Agar animasi restart saat panel pindah
                                    as="span"
                                    text={["Riwayat Pencarian"]
                                    }
                                    typingSpeed={100}
                                    pauseDuration={2000}
                                    className="text-sm font-bold text-gray-700  " // Styling judul tetap sama
                                    cursorClassName="text-blue-500" // Opsional: warna kursor
                                />
                            </div>

                            {/* ITEMS (HANYA 5 TERLIHAT, SISANYA SCROLL) */}
                            {history.slice(0, 10).map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center bg-slate-100 hover:bg-neutral-300 p-2 px-3"
                                >
                                    <span
                                        className="text-gray-800 cursor-pointer text-md"
                                        onClick={() => this.selectHistory(item)}
                                    >
                                        {item}
                                    </span>
                                    <button
                                        onClick={() => this.removeHistoryItem(i)}
                                        className="font-bold text-gray-600 hover:text-red-500 text-xl"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


export default SearchBar;