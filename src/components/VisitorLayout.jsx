import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sprout, Menu, X, MapPin, User, Leaf } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const navItems = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/explore", label: "المزارع" },
  { to: "/experiences", label: "التجارب" },
  { to: "/ai-finder", label: "رفيقي الذكي" },
  { to: "/journey", label: "رحلتي" },
  { to: "/rewards", label: "نقاطي" }
];

export default function VisitorLayout() {
  const [open, setOpen] = useState(false);
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-soft">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-extrabold text-base text-foreground">المزرعة الذكية</div>
              <div className="text-[11px] text-muted-foreground">المدينة المنورة</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-sm font-bold text-primary">
              <span>⭐</span><span>{state.points.toLocaleString("ar-EG")}</span><span className="text-muted-foreground font-medium">نقطة</span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الدخول</span>
            </button>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-secondary">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border/60 bg-card px-4 py-3">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-semibold ${isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/owner" onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-secondary">
                حلول المزارع
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center"><Sprout className="w-5 h-5" /></div>
              <span className="font-heading font-extrabold">المزرعة الذكية</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">اكتشف المزارع، عِش التجربة، واحصد نقاطك. منصة ذكية للسياحة الزراعية في المدينة المنورة.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/explore" className="hover:text-primary">اكتشف المزارع</Link></li>
              <li><Link to="/ai-finder" className="hover:text-primary">رفيقك الذكي</Link></li>
              <li><Link to="/owner" className="hover:text-primary">حلول المزارع</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">الموقع</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> المدينة المنورة، المملكة العربية السعودية</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground"><Leaf className="w-4 h-4 text-primary" /> مدعوم بالذكاء الاصطناعي</div>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">© 2026 المزرعة الذكية — جميع الحقوق محفوظة</div>
      </footer>
    </div>
  );
}