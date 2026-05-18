import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const HeaderDashboard: React.FC = () => {
  const user = {
    name: "AZIZBEK SHOKIRALIYEV",
    avatarUrl: "",
  }

  return (
    <header className="w-full bg-[#0B0E14] border-b border-slate-900 px-6 py-4 flex items-center justify-between">
      
      <div>
        <h1 className="text-sm font-medium tracking-wide text-slate-400 uppercase">
          SALOM, <span className="font-black text-blue-500 italic">{user.name}</span>
        </h1>
      </div>

      <div className="flex items-center gap-4 ">
        <div>
            <button className="flex items-center gap-3 bg-[#131926]/60 border border-slate-800/80 pl-2 pr-4 py-1.5 rounded-full hover:bg-[#131926] transition-colors focus:outline-none group">
              <Avatar className="h-7 w-7 border border-orange-500">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-orange-600 text-white font-black text-xs">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-[11px] font-bold text-slate-300 tracking-wider group-hover:text-white transition-colors">
                {user.name}
              </span>
            </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderDashboard