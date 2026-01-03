import React from "react";
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t bg-white h-10">
      <div className="flex items-center justify-around px-6 py-0.5 text-[12px]  w-full">
        {/* LEFT */}
        <p className="py-2 text-[16px] text-secondary">
          Copyright © 2023{" "}
          <span className="font-semibold">aicountly</span> | All rights reserved
        </p>

        {/* RIGHT */}
        <a
          href="#"
          className=" transition font-medium text-[16px] text-[#8a94ad]"
        >
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
