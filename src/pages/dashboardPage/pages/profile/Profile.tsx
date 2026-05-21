import { useState } from 'react';
import { Camera, Save, X, Edit3, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form ma'lumotlari uchun state
  const [formData, setFormData] = useState({
    firstName: "Azizbek",
    lastName: "Example",
    email: "azizbek@example.com"
  });

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <div className="p-6 md:m-12 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Profil</h1>
            <p className="text-neutral-500">Shaxsiy ma'lumotlaringizni boshqaring</p>
          </div>
          <Button 
            variant={isEditing ? "ghost" : "outline"} 
            onClick={() => setIsEditing(!isEditing)}
            disabled={isLoading}
          >
            {isEditing ? <><X className="mr-2" size={16}/> Bekor qilish</> : <><Edit3 className="mr-2" size={16}/> Tahrirlash</>}
          </Button>
        </div>

        <Card className="bg-[#0a0a0c] border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg">Asosiy ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-2xl bg-neutral-800 overflow-hidden border-2 border-neutral-700">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.firstName}`} alt="Avatar"/>
                </div>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                    <Camera size={24} className="text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{formData.firstName} {formData.lastName}</h3>
                <p className="text-neutral-500 font-mono text-sm">{formData.email}</p>
              </div>
            </div>

            <Separator className="bg-neutral-800" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Ism</label>
                <Input 
                  value={formData.firstName}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="bg-neutral-950 border-neutral-800" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Familiya</label>
                <Input 
                  value={formData.lastName}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="bg-neutral-950 border-neutral-800" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email</label>
                <Input 
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-neutral-950 border-neutral-800" 
                />
              </div>
            </div>

            {isEditing && (
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 animate-spin" size={18}/> Saqlanmoqda...</>
                ) : (
                  <><Save className="mr-2" size={18}/> O'zgarishlarni saqlash</>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;