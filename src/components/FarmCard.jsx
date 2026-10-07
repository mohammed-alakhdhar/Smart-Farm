import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Users, Check, X } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function FarmCard({ farm }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-lift transition-all duration-300 flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <Image src={farm.image} alt={farm.name} className="w-full h-full" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          {farm.rating}
        </div>
        <div className="absolute top-3 left-3">
          {farm.available ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold"><Check className="w-3 h-3" /> متاح</span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold"><X className="w-3 h-3" /> محجوز</span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 left-3">
          <h3 className="text-white font-heading font-extrabold text-lg drop-shadow">{farm.name}</h3>
          <div className="flex items-center gap-1 text-white/90 text-xs"><MapPin className="w-3.5 h-3.5" /> {farm.location}</div>
          <div className="text-white/80 text-[11px] mt-0.5">على بعد {farm.distance}</div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">{farm.farmType}</span>
          <span className="px-2.5 py-1 rounded-full bg-accent/60 text-xs font-semibold text-earth">{farm.experienceType}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{farm.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {farm.duration}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> حتى {farm.capacity}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-heading font-extrabold text-primary">{farm.price}</span>
            <span className="text-sm text-muted-foreground"> ريال</span>
          </div>
          <Link
            to={`/farms/${farm.id}`}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
          >
            عرض المزرعة
          </Link>
        </div>
      </div>
    </div>
  );
}