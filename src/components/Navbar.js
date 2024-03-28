import React from "react";

const Navbar = () => {
  return (
    <>
      <main className="sticky top-0 w-full sm:px-8 px-4 py-2 bg-[#F4F6F8] shadow-sm bg-opacity-60 backdrop-filter backdrop-blur-lg text-[#202226] z-50">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Globe Explorer</h2>
          <div>
            <button className="white-button rounded">Welcome Back!</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Navbar;
