import React from 'react'

const DashboardFooter = () => {
  return (
   <footer className="w-full border-t border-[#cbd0dd] px-6 py-5 ">
    <div className="flex items-center justify-around text-sm text-[#31374a]">
      
      {/* LEFT */}
      <div>
        Copyright © 2023 aicountly | All rights reserved FY: 2025-26, HO
      </div>

      {/* RIGHT */}
      <div className="cursor-pointer hover:underline text-[#6e7891]">
        Terms & Conditions
      </div>

    </div>
  </footer>
  )
}

export default DashboardFooter
