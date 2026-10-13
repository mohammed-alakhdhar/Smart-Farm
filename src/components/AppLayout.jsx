import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sprout, LayoutDashboard, FlaskConical, Recycle, Sparkles, ShieldCheck, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard, end: true },
  { to: "/request-processing", label: "طلب معالجة المبيدات", icon: FlaskConical },
  { to: "/waste", label: "المخلفات الزراعية", icon: Recycle },
  { to: "/assistant", label: "رفيق المزارع", icon: Sparkles }
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className={`fixed lg:sticky top-0 right-0 z-40 h-screen w-72 bg-sidebar border-l border-sidebar-border transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center"><Sprout className="w-5 h-5" /></div>
            <div className="leading-tight">
              <div className="font-heading font-extrabold text-sm">المزرعة الذكية</div>
              <div className="text-[11px] text-muted-foreground">حلول المزارع والمصانع</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-sidebar-accent"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
              <ShieldCheck className="w-4.5 h-4.5" />
              لوحة الإدارة
            </NavLink>
          )}
        </nav>
        <div className="p-3 mt-auto space-y-2">
          <div className="px-3.5 py-2 rounded-xl bg-sidebar-accent/60 text-xs text-muted-foreground">
            مرحبًا، {user?.full_name || user?.email || "مستخدم"}
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-sidebar-accent">
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-sidebar-accent">
            <Sprout className="w-4 h-4" /> العودة للرئيسية
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 sticky top-0 z-20 glass border-b border-border/60 flex items-center justify-between px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-secondary"><Menu className="w-5 h-5" /></button>
          <div className="hidden lg:block">
            <h1 className="font-heading font-bold text-lg">المزرعة الذكية</h1>
          </div>
          <Link to="/dashboard" className="text-sm font-semibold text-primary hover:underline">لوحة التحكم</Link>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}