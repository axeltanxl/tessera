"use client";
import React, { useState } from "react";
import Link from 'next/link'
import SearchBar from "./SearchBar";
import { AiOutlineMenu, AiOutlineClose, AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { signOut } from "next-auth/react";

import MyAccountDropdown from "../MyAccountDropdown";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  }
  const menuLeft = [
    { name: "Events", url: "/events" },
    { name: "Marketplace", url: "/marketplace" },
    { name: "FAQ ", url: "/faq" },
  ];

  const menuRight = [
    { name: "Sign In/Register ", url: "/" },
  ]

  return (
    <nav className="sticky top-0 w-full h-14 z-50 pt-2 bg-primary drop-shadow-sm">
      <div className="flex justify-between items-center h-full w-full px-4 md:px-10 2xl:px-24">
        <div className="flex items-center">
          {/*Left side */}
          <div onClick={handleNav} className="md:hidden cursor-pointer pr-2">
            {/*Mobile screen Menu Button*/}
            <AiOutlineMenu size={25} />
          </div>
          <div className="flex md:fixed">
            <Link href="/">
              <img src="/tessera-logo.png" width={120} alt="logo" /> {/*To replace with logo*/}
            </Link>
          </div>
          <div>
            {/*Center*/}
            <ul className="hidden md:flex ml-24 mr-2">
              {menuLeft.map(({ name, url }) => {
                return (
                  <Link href={url} key={name}>
                    <li className="ml-8 hover:opacity-60">
                      {name}
                    </li>
                  </Link>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-row items-center">
          {/**Right side */}
          <SearchBar style={"hidden xs:block"} />
          {/* <button 
          onClick={signOut}
          className="bg-amber-300 px-2 rounded-full ml-2 hidden lg:block">Sign Out</button> */}
          
          <MyAccountDropdown />
        </div>

      </div>

      {/**Mobile Screen Menu*/}
      <div className={menuOpen ?
        "fixed left-0 top-0 w-[100%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500 z-50"
        : "fixed left-[-100%] top-0 w-[65%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"}>
        <div className="flex w-full items-center">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <ul className="flex-col py-4">
          {menuLeft.map(({ name, url }) => {
            return (
              <Link href={url} key={name} onClick={() => setMenuOpen(false)}>
                <li className="py-4 cursor-pointer hover:border-b">
                  {name}
                </li>
              </Link>
            )
          })}
        </ul>

        <button 
        onClick={signOut}
        className="bg-amber-300 px-2 rounded-full">Sign Out</button>
        <div className="flex flex-row justify-around pt-10 items-center">
          <AiOutlineInstagram size={30} className="cursor-pointer" />
          <AiOutlineFacebook size={30} className="cursor-pointer" />
          <AiOutlineTwitter size={30} className="cursor-pointer" />
        </div>
        <div className="flex justify-center items-center">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <img src="/tessera-logo.png" width={100} alt="logo" className="min-h-full mt-6" /> {/*To replace with logo*/}
          </Link>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <SearchBar style={"xs:hidden"} />
      </div>
    </nav>
  )
}
export default Navbar;