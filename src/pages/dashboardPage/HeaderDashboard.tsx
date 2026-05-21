import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const HeaderDashboard: React.FC = () => {
  const user = {
    name: "AZIZBEK SHOKIRALIYEV",
    avatarUrl: "",
  }

  return (
    <header className="w-full border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      
      <div>
        <h1 className="text-sm font-medium tracking-wide text-slate-400 uppercase">
          SALOM, <span className="font-black text-blue-500 italic">{user.name}</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div>
            <button className="flex items-center gap-3 border border-slate-700/70 pl-2 pr-4 py-1.5 rounded-full">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-orange-600 text-white font-black text-xs">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-[11px] font-bold text-slate-300 tracking-wider">
                {user.name}
              </span>
            </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderDashboard