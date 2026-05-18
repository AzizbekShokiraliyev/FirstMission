import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Key, Camera, Save, RefreshCw } from "lucide-react";

const Profile = () => {
  // Foydalanuvchi ma'lumotlari uchun boshlang'ich holat (State)
  const [formData, setFormData] = useState({
    fullName: "Azizbek Mahmudov",
    email: "azizbek@example.com",
    role: "Senior Admin",
    currentPassword: "",
    newPassword: "",
  });

  // Inputlar o'zgarganda state'ni yangilash funksiyasi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full space-y-6 text-white animate-fade-in p-1 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Card className="bg-slate-950 backdrop-blur-md border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between h-auto">
          <div className="w-full text-center space-y-5">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800/60 w-full justify-start">
              <User className="text-blue-400 h-5 w-5" />
              <h3 className="text-sm font-bold uppercase text-slate-200 tracking-wider">Foydalanuvchi</h3>
            </div>

            <div className="relative group w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-2 border-slate-800 flex items-center justify-center font-black text-2xl text-white shadow-xl">
                AM
              </div>
              <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-slate-300">
                <Camera size={18} />
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-200 tracking-tight">{formData.fullName}</h2>
              <p className="text-xs text-slate-500">{formData.email}</p>
            </div>

            <div className="pt-2">
              <Badge className="bg-blue-500/10 hover:bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-xl text-xs font-bold gap-1.5">
                <Shield size={12} /> {formData.role}
              </Badge>
            </div>
          </div>

          <div className="w-full text-center pt-5 border-t border-slate-800/40 mt-6 text-[11px] text-slate-500">
            Oxirgi faollik: Bugun, 16:15
          </div>
        </Card>

        <Card className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border-slate-800/60 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-950/40 border-b border-slate-800/40 p-5">
            <CardTitle className="text-base font-bold text-slate-200">Profilni Tahrirlash</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">To'liq ism</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-500 h-4 w-4" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Email Manzil</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-slate-500 h-4 w-4" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-800/40" />

            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-sm">
                <Key size={16} className="text-amber-400" />
                <span>Xavfsizlik kalitini yangilash</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Joriy parol</label>
                  <input 
                    type="password" 
                    name="currentPassword"
                    placeholder="••••••••"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 px-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-colors placeholder:text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Yangi parol</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    placeholder="Kamida 6 ta belgi"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 px-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-colors placeholder:text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button 
                type="button" 
                className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-slate-400"
              >
                <RefreshCw size={14} /> Bekor qilish
              </button>
              <button 
                type="button" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-blue-500/10"
              >
                <Save size={14} /> O'zgarishlarni saqlash
              </button>
            </div>

          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default Profile;