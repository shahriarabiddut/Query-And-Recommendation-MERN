import React, { useState, useEffect } from "react";
import { TbColumns1, TbColumns2, TbColumns3 } from "react-icons/tb";

const LayoutSelector = ({ setColumns }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <p className="font-barlow text-2xl">Layout:</p>

      {windowWidth >= 400 && (
        <button
          className="p-2 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
          onClick={() => setColumns(1)}
        >
          <TbColumns1 className="text-xl" /> 1 Column
        </button>
      )}
      {windowWidth >= 600 && (
        <button
          className="p-2 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
          onClick={() => setColumns(2)}
        >
          <TbColumns2 className="text-xl" /> 2 Columns
        </button>
      )}
      {windowWidth >= 800 && (
        <button
          className="p-2 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
          onClick={() => setColumns(3)}
        >
          <TbColumns3 className="text-xl" /> 3 Columns
        </button>
      )}
      {windowWidth >= 1000 && (
        <button
          className="p-2 rounded-xl bg-blue-500 text-white flex gap-2 items-center"
          onClick={() => setColumns(4)}
        >
          <TbColumns3 className="text-xl" /> 4 Columns
        </button>
      )}
    </div>
  );
};

export default LayoutSelector;
