import React from "react";
import Menu from "./menu";
import Rightbar from "./rightbar";
import Link from "next/link";

const main = () => {
  return (
    <div className="absolute left-0 top-0 z-[1000] w-full">
      <div className="flex flex-row justify-center relative w-screen px-5 py-5 items-center container mx-auto">
        <div className="absolute left-5">
          <Menu />
        </div>
        <div>
          <Link href="/">
          <p className="lobsterfont text-2xl">Filmový Ráj</p>
          </Link>
        </div>
        <div className="absolute right-5">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default main;
