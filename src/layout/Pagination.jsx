import React from 'react';
// import import StarBorder from './StarBorder'
function toRoman(num) {
    const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];

    let result = "";
    for (const [roman, value] of romanNumerals) {
        while (num >= value) {
            result += roman;
            num -= value;
        }
    }
    return result;
}

class Pagination extends React.Component {
    #page 
    #onPageChange
    getPage() {
        return this.#page;
    }
    getOnPageChange() {
        return this.#onPageChange;
    }
    render() {
        const { page, onPageChange } = this.props;
        return (
            <div className="flex justify-center gap-4 text-lg font-semibold text-white ">
                <button
                    onClick={() => onPageChange(-1)}
                    className="px-4 py-2 rounded-lg  text-white shadow-lg hover:bg-white/65  border-white/70 border-2 "
                >
                    Sebelumnya
                </button>
                <span className=" font-semibold text-white text-xl underline-offset-4 underline border border-white p-1 px-4 rounded-sm"> {toRoman(page)}</span>
                <button
                    onClick={() => onPageChange(1)}
                    className="px-4 py-2 rounded-lg text-white shadow-lg hover:bg-white/65 border-white/70 border-2 "
                >
                    Selanjutnya
                </button>
            </div>
        );
    }
}

export default Pagination;