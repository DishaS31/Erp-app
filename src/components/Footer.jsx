import React from "react";
const Footer = () => {
  return (
    <footer className="w-full border-t bg-white flex">
      <div className="flex items-center justify-between px-6 py-3 text-[12px] text-secondary w-full">
        {/* LEFT */}
        <p className="py-2 text-lg">
          Copyright © 2023{" "}
          <span className="font-semibold">aicountly</span> | All rights reserved
        </p>

        {/* RIGHT */}
        <a
          href="#"
          className="hover:text-primary transition font-medium text-sm"
        >
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
