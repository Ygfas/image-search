// import React from "react";

//  class ButtonDownload extends React.Component {
    
//     render() {
        
//         return(
            
//             <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity 
//                              duration-300  " >
//                 <button className="p-1 px-4 bg-white  rounded-md shadow hover:scale-110 transition text-2xl font-bold ">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="download">
//                         <path fill="#212121" d="M3.5,13 L12.5,13 C12.9142136,13 13.25,13.3357864 13.25,13.75 C13.25,14.1296958 12.9678461,14.443491 12.6017706,14.4931534 L12.5,14.5 L3.5,14.5 C3.08578644,14.5 2.75,14.1642136 2.75,13.75 C2.75,13.3703042 3.03215388,13.056509 3.39822944,13.0068466 L3.5,13 L12.5,13 L3.5,13 Z M7.89822944,1.00684662 L8,1 C8.37969577,1 8.69349096,1.28215388 8.74315338,1.64822944 L8.75,1.75 L8.75,9.438 L11.0052038,7.18413593 C11.2714703,6.91786937 11.688134,6.89366331 11.9817455,7.11151777 L12.065864,7.18413593 C12.3321305,7.45040249 12.3563366,7.86706617 12.1384821,8.16067767 L12.065864,8.2447961 L8.53033005,11.78033 C8.26406349,12.0465966 7.84739981,12.0708026 7.55378831,11.8529482 L7.46966988,11.78033 L3.93413597,8.2447961 C3.64124276,7.95190288 3.64124276,7.47702915 3.93413597,7.18413593 C4.20040254,6.91786937 4.61706622,6.89366331 4.91067771,7.11151777 L4.99479615,7.18413593 L7.25,9.44 L7.25,1.75 C7.25,1.37030423 7.53215388,1.05650904 7.89822944,1.00684662 L8,1 L7.89822944,1.00684662 Z"></path>
//                     </svg>
//                 </button>
//             </div>

//         )
//     }
    
// } 

// export default ButtonDownload

import React from "react";

class ButtonDownload extends React.Component {
    handleDownload = async () => {
        const { imageUrl, filename } = this.props;

        if (!imageUrl) {
            console.error("URL gambar tidak tersedia.");
            return;
        }

        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error("Gagal mengambil gambar");

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename || "unsplash-image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            alert(`Gambar berhasil diunduh`)
        } catch (error) {
            console.error("Gagal mengunduh gambar:", error);
            alert("Gagal mengunduh gambar. Periksa koneksi atau URL.");
        }
    };

    render() {
        return (
            <div className=" opacity-100 transition-opacity duration-300 z-20">
              
                <button
                    onClick={this.handleDownload}
                    className="p-1 absolute right-2 top-3 z-30 px-4 bg-white rounded-md shadow hover:scale-110 transition text-2xl font-bold opacity-0 group-hover:opacity-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="download">
                        <path
                            fill="#212121"
                            d="M3.5,13 L12.5,13 C12.9142136,13 13.25,13.3357864 13.25,13.75 C13.25,14.1296958 12.9678461,14.443491 12.6017706,14.4931534 L12.5,14.5 L3.5,14.5 C3.08578644,14.5 2.75,14.1642136 2.75,13.75 C2.75,13.3703042 3.03215388,13.056509 3.39822944,13.0068466 L3.5,13 L12.5,13 L3.5,13 Z M7.89822944,1.00684662 L8,1 C8.37969577,1 8.69349096,1.28215388 8.74315338,1.64822944 L8.75,1.75 L8.75,9.438 L11.0052038,7.18413593 C11.2714703,6.91786937 11.688134,6.89366331 11.9817455,7.11151777 L12.065864,7.18413593 C12.3321305,7.45040249 12.3563366,7.86706617 12.1384821,8.16067767 L12.065864,8.2447961 L8.53033005,11.78033 C8.26406349,12.0465966 7.84739981,12.0708026 7.55378831,11.8529482 L7.46966988,11.78033 L3.93413597,8.2447961 C3.64124276,7.95190288 3.64124276,7.47702915 3.93413597,7.18413593 C4.20040254,6.91786937 4.61706622,6.89366331 4.91067771,7.11151777 L4.99479615,7.18413593 L7.25,9.44 L7.25,1.75 C7.25,1.37030423 7.53215388,1.05650904 7.89822944,1.00684662 L8,1 L7.89822944,1.00684662 Z"
                        ></path>
                    </svg>
                </button>
            </div>
        );
    }
}

export default ButtonDownload;