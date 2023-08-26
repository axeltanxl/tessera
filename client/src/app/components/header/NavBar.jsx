"use client";
import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import SearchBar from "./SearchBar";
import Image from 'next/image';
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const menuLeft = [
    { name: "Events", url: "/Events" },
    { name: "Categories", url: "/Categories" },
    { name: "FAQ ", url: "/FAQ" },
  ];

  const menuRight = [
    { name: "Sign In/Register ", url: "/" },
  ]

  return (
    <nav className="w-full bg-black">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="flex flex-row items-center">
          <div>
            <div className="flex items-center justify-between py-2 md:py-5 md:block">
              <div className="flex flex-row items-center">
                {/* HAMBURGER BUTTON FOR MOBILE */}
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none "
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <Image src="/close.svg" width={30} height={30} alt="logo" />
                    ) : (
                      <Image
                        src="/hamburger-menu.svg"
                        width={30}
                        height={30}
                        alt="logo"
                      />
                    )}
                  </button>
                </div>
                {/* LOGO */}
                <Link href="/">
                  <h1 className="text-3xl text-white font-bold mr-4 ">Tessera</h1>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
          >
            <ul className="h-screen md:h-auto items-center justify-center md:flex ">
              {menuLeft.map(({ name, url }) => {
                return (
                  <li className="pb-6 md:pb-0">
                    <Link href={url} key={name} className="flex items-center text-white mx-3" onClick={() => setNavbar(!navbar)}>
                      {name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="pb-2 md:pb-0">
            <SearchBar />
          </div>
        </div>
        <div>
          <Image src="/profile-circle.svg" width={30} height={30} alt="logo" />
        </div>
      </div>
    </nav>
  )

  // return (
  //   <nav className="bg-black">
  //       <div className="justify-between  lg:max-w-7xl md:items-center md:flex md:px-8">
  //         <div className="flex flex-row ">
  //           <Link href="/">
  //             <h1 className="text-3xl text-white font-bold mr-4 ">Tessera</h1>
  //           </Link>
  //           {/*hamburger button for mobile*/}
  //           <div className="md:hidden">
  //             <button onClick={() => setNavbar(!navbar)}>
  //               {navbar? (
  //                 <Image src="/close.svg" width={30} height={30} alt="close-logo"/>
  //               ): (
  //                 <Image src="/hamburger-menu.svg" width={30} height={30} alt="menu-logo"/>
  //               )}
  //             </button>
  //           </div>  
  //           {menuLeft.map(({ name, url }) => {
  //             return (
  //               <Link href={url} key={name} className="flex items-center text-white mx-3">
  //                 <div>{name}</div>
  //               </Link>
  //             )
  //           })}
  //         </div>
  //         <div className="flex flex-row">
  //           <SearchBar/>
  //           {menuRight.map(({ name, url }) => {
  //             return (<div key={name} className="text-white flex items-center mx-3">{name}</div>)
  //           })}
  //         </div>
  //       </div>
  //   </nav>
  // );
};
export default Navbar;