import React from "react";
class ExtraCard extends React.Component{
render(){
    return(
        <div className="container flex mx-auto  bg-white w-180 rounded-sm shadow-xl my-2">
            <div className="flex justify-evenly m-4  w-full flex-wrap ">
                <div className="justify-evenly font-mono text-slate-800 ">
                    <h1 className="text-sm my-2 font-semibold">Lorem, ipsum dolor.</h1>
                    <figure className="hover:opacity-90">
                        <img src="../image/anime-girl-nun-with-tattoo-4k-wallpaper-uhdpaper.com-740@3@a.jpg" alt="" />
                    </figure>
                    <ul classNameName="flex justify-start my-2 gap-2 flex-wrap text-gray-600 font-medium font-[calibri]">
                        <li className="bg-[#cccc] px-2 rounded-sm shadow-sm hover:bg-[#b3b3b3]"></li>
                       

                    </ul>
                    <h1 className="mt-10 mb-2 font-bold tracking-tighter">Gambar Terkait</h1>
                    <div className="flex flex-wrap gap-4 text-left font-mono mx-auto  justify-between ">

                        <div className="columns-2 gap-4  ">
                            <div className="">
                                <img src="../image/1125210.png" className="w-full h-full mb-4" />
                            </div>
                          

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
}