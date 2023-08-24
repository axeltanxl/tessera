"use client";
import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
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
    <nav className="bg-black">
      <div className="justify-between  lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="flex flex-row ">
          <Link href="/">
            <h1 className="text-3xl text-white font-bold mr-4 ">Tessera</h1>
          </Link>
          {menuLeft.map(({ name, url }) => {
            return (
              <Link href={url} key={name} className="flex items-center text-white mx-3">
                <div>{name}</div>
              </Link>
            )
          })}
        </div>
        <div className="flex flex-row">
          {menuRight.map(({ name, url }) => {
            return (<div key={name} className="text-white flex items-center mx-3">{name}</div>)
          })}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;