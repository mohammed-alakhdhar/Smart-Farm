import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { FARMS, REGIONS, FARM_TYPES, EXPERIENCE_TYPES } from "@/lib/mockData";
import FarmCard from "@/components/FarmCard";
import { Pill } from "@/components/ui-bits";

export default function ExploreFarms() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [farmType, setFarmType] = useState("");
  const [expType, setExpType] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [familyOnly, setFamilyOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return FARMS.filter((f) => {
      if (q && !f.name.includes(q) && !f.location.includes(q)) return false;
      if (region && f.region !== region) return false;
      if (farmType && f.farmType !== farmType) return false;
      if (expType && f.experienceType !== expType) return false;
      if (f.price > maxPrice) return false;
      if (f.rating < minRating) return false;
      if (familyOnly && !f.familyFriendly) return false;
      return true;
    });
  }, [q, region, farmType, expType, maxPrice, minRating, familyOnly]);

  const reset = () => { setRegion(""); setFarmType(""); setExpType(""); setMaxPrice(300); setMinRating(0); setFamilyOnly(false); setQ(""); };

  return (
    <div className="bg-background">
      <div className="bg-gradient-to-l from-primary to-olive text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">اكتشف المزارع</h1>
          <p className="mt-2 text-primary-foreground/85">تصفّح مزارع المدينة المنورة وفلتر حسب تفضيلاتك</p>
          <div className="mt-6 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن مزرعة أو منطقة..."
              className="w-full bg-card text-foreground rounded-2xl pr-12 pl-4 py-3.5 text-sm font-medium shadow-card outline-none border border-transparent focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold text-sm">الفلاتر</span>
            <span className="text-xs text-muted-foreground">({filtered.length} نتيجة)</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reset} className="text-xs text-muted-foreground hover:text-primary">إعادة تعيين</button>
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-sm font-semibold">
              {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />} فلترة
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Pill active={!region} onClick={() => setRegion("")}>كل المناطق</Pill>
          {REGIONS.map((r) => <Pill key={r} active={region === r} onClick={() => setRegion(r)}>{r}</Pill>)}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block bg-card rounded-2xl border border-border shadow-card p-5 h-fit lg:sticky lg:top-20`}>
            <FilterGroup title="نوع المزرعة">
              <PillRow options={[{ v: "", l: "الكل" }, ...FARM_TYPES.map((t) => ({ v: t, l: t }))]} value={farmType} onChange={setFarmType} />
            </FilterGroup>
            <FilterGroup title="نوع التجربة">
              <div className="flex flex-col gap-1.5">
                <button onClick={() => setExpType("")} className={`text-right px-3 py-1.5 rounded-lg text-sm ${expType === "" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>الكل</button>
                {EXPERIENCE_TYPES.map((t) => (
                  <button key={t} onClick={() => setExpType(t)} className={`text-right px-3 py-1.5 rounded-lg text-sm ${expType === t ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{t}</button>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup title={`السعر — حتى ${maxPrice} ريال`}>
              <input type="range" min={50} max={300} step={10} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
            </FilterGroup>
            <FilterGroup title="التقييم">
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button key={r} onClick={() => setMinRating(r)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${minRating === r ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{r === 0 ? "الكل" : `+${r}`}</button>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup title="مناسب للعائلات">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={familyOnly} onChange={(e) => setFamilyOnly(e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="text-sm">عرض المزارع العائلية فقط</span>
              </label>
            </FilterGroup>
          </aside>

          {/* Results */}
          <div>
            {filtered.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-16 text-center">
                <div className="text-5xl mb-3">🌾</div>
                <h3 className="font-bold text-lg">لا توجد نتائج مطابقة</h3>
                <p className="text-muted-foreground text-sm mt-1">جرّب تعديل الفلاتر للعثور على مزارع أخرى.</p>
                <button onClick={reset} className="mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">إعادة تعيين الفلاتر</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((f) => <FarmCard key={f.id} farm={f} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="mb-5 pb-5 border-b border-border last:border-0 last:pb-0 last:mb-0">
      <div className="font-bold text-sm mb-2.5">{title}</div>
      {children}
    </div>
  );
}

function PillRow({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button key={o.v} onClick={() => onChange(o.v)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${value === o.v ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>{o.l}</button>
      ))}
    </div>
  );
}