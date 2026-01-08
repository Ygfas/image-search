import { SiPicxy, SiReact, SiUnsplash } from "react-icons/si";
import { SiAcer, SiDocker } from "react-icons/si";
import React from "react";
import viteLogo from "../../public/assets/vite.svg";


export default class Header extends React.Component {
    render() {


        return (
            <div className="container max-w-screen text-white font-mono">
                <div className="flex justify-between items-center mx-auto w-full">

                    {/* Kiri */}
                    <div className="flex flex-col gap-2 p-2 pl-5 my-2 items-center flex-wrap">
                        <SiUnsplash size={40} />
                        <h2 className="text-center">Powered by Unsplash</h2>
                    </div>

                    {/* Kanan */}
                    <div className="flex gap-2 flex-col p-2 my-2 items-center flex-wrap">
                        {/* Cukup gunakan / diikuti nama filenya langsung */}
                        <img src={viteLogo} alt="Vite Logo" size={60} />
                        <h2 className="text-center">PictMe</h2>
                      
                    </div>

                </div>
            </div>
        );
    }

}