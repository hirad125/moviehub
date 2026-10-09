"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Film, Lock, Settings, BarChart3, Clapperboard } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const savedName = localStorage.getItem("moviehub_display_name");
      if (!savedName) {
        setShowNameModal(true);
      } else {
        setDisplayName(savedName);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveName() {
    if (!nameInput.trim() || nameInput.trim().length < 2) {
      alert("نیم باید حداقل ۲ حرف باشد");
      return;
    }
    setSaving(true);
    localStorage.setItem("moviehub_display_name", nameInput.trim());
    setDisplayName(nameInput.trim());
    setShowNameModal(false);
    setSaving(false);
  }

  const cards = [
    {
      title: "ساخت پنل فیلم",
      description: "ایجاد پنل اختصاصی خود",
      icon: Film,
      color: "#22d3ee",
      path: "/create-panel",
    },
    {
      title: "ورود به پنل فیلم",
      description: "ورود به پنل‌های موجود",
      icon: Lock,
      color: "#c084fc",
      path: "/join-panel",
    },
    {
      title: "تنظیمات",
      description: "مدیریت حساب کاربری",
      icon: Settings,
      color: "#34d399",
      path: "/settings",
    },
    {
      title: "وضعیت پنل فیلم",
      description: "مشاهده اطلاعات پنل",
      icon: BarChart3,
      color: "#fbbf24",
      path: "/status",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050510]">
        <div className="text-cyan-400 text-xl animate-pulse">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <Clapperboard className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">نیم خود را انتخاب کنید</h2>
            <p className="text-slate-400 text-sm mb-6">
              این نام در چت، لیست اعضا و فعالیت‌های شما در پنل نمایش داده می‌شود.
            </p>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="نیم نمایشی شما"
              className="w-full bg-slate-900/80 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 mb-4"
              maxLength={20}
            />
            <button
              onClick={handleSaveName}
              disabled={saving}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-xl"
            >
              {saving ? "در حال ثبت..." : "ثبت نیم"}
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-6">
            <Clapperboard className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Movie<span className="text-cyan-400">Hub</span>
          </h1>
          <p className="text-slate-400 text-lg">به دنیای فیلم‌ها خوش آمدید</p>
          {displayName && (
            <p className="mt-3 text-cyan-300/80 text-sm">
              سلام، <span className="font-semibold">{displayName}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={() => router.push(card.path)}
                className="glass group p-6 text-right transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" style={{ color: card.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.description}</p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-16 text-slate-500 text-sm">
          <p>MovieHub 2025 ©</p>
        </div>
      </div>
    </div>
  );
    }
