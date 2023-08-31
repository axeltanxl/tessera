"use client";
import React, { useState } from "react";
import Link from 'next/link'
import SearchBar from "./SearchBar";
import { AiOutlineMenu, AiOutlineClose, AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  }
  const menuLeft = [
    { name: "Events", url: "/Events" },
    { name: "Categories", url: "/Categories" },
    { name: "Marketplace", url: "/Marketplace" },
    { name: "FAQ ", url: "/FAQ" },
  ];

  const menuRight = [
    { name: "Sign In/Register ", url: "/" },
  ]

  return (
    <nav className="sticky w-full h-10">
      <div className="flex justify-between items-center h-full w-full px-4 md:px-10 2xl:px-24">
        <div className="flex items-center">
          {/*Left side */}
          <div onClick={handleNav} className="md:hidden cursor-pointer pr-2">
            {/*Mobile screen Menu Button*/}
            <AiOutlineMenu size={25} />
          </div>
          <Link href="/">
            <img src="/tessera-logo.png" width={100} alt="logo" className="min-h-full block" /> {/*To replace with logo*/}
          </Link>
          <div>
            {/*Center*/}
            <ul className="hidden md:flex">
              {menuLeft.map(({ name, url }) => {
                return (
                  <Link href={url} key={name}>
                    <li className="ml-8 hover:border-b">
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
          <SearchBar />
          <BiUserCircle size={25} className="cursor-pointer" />
          <button className="bg-amber-300 px-2 rounded-full ml-2 hidden lg:block">Sign in</button>
        </div>

      </div>

      {/**Mobile Screen Menu*/}
      <div className={menuOpen ?
        "fixed left-0 top-0 w-[100%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
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

        <button className="bg-amber-300 px-2 rounded-full">Sign in</button>
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
    </nav>
  )
}
export default Navbar;