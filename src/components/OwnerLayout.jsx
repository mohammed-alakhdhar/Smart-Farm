import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sprout, LayoutDashboard, Plus, Calendar, Users, BarChart3, Sparkles, Menu, X, ArrowLeft } from "lucide-react";

const navItems = [
  { to: "/owner", label: "لوحة التحكم", icon: LayoutDashboard, end: true },
  { to: "/owner/farm", label: "مزرعتي", icon: Sprout },
  { to: "/owner/experiences", label: "التجارب", icon: Plus },
  { to: "/owner/bookings", label: "الحجوزات", icon: Calendar },
  { to: "/owner/visitors", label: "الزوار", icon: Users },
  { to: "/owner/analytics", label: "التحليلات", icon: BarChart3 },
  { to: "/owner/insights", label: "رؤى الذكاء الاصطناعي", icon: Sparkles }
];

export default function OwnerLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 right-0 z-40 h-screen w-72 bg-sidebar border-l border-sidebar-border transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
          <Link to="/owner" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center"><Sprout className="w-5 h-5" /></div>
            <div className="leading-tight">
              <div className="font-heading font-extrabold text-sm">لوحة المزارع</div>
              <div className="text-[11px] text-muted-foreground">المزرعة الذكية</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-sidebar-accent"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`
              }
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 mt-auto">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-sidebar-accent">
            <ArrowLeft className="w-4 h-4" /> العودة للزوار
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 sticky top-0 z-20 glass border-b border-border/60 flex items-center justify-between px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-secondary"><Menu className="w-5 h-5" /></button>
          <div className="hidden lg:block">
            <h1 className="font-heading font-bold text-lg">لوحة تحكم المزارع</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">مرحبًا، أبو عبدالله 👋</div>
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold">ع</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}