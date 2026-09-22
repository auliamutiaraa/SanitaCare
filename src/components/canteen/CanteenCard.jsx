import React from 'react';
import { Link } from 'react-router-dom';
import { GradeBadge } from './GradeBadge';
import { Star, MapPin } from 'lucide-react';

export const CanteenCard = ({ canteen }) => {
  return (
    <div className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-2xl border border-slate-200 overflow-hidden bg-white flex flex-col h-full group">
      <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
        <img 
          src={canteen.banner_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'} 
          alt={canteen.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'; }}
        />
        <div className="absolute top-3 right-3">
          <GradeBadge grade={canteen.current_grade || 'C'} />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-2">{canteen.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            <MapPin className="w-3 h-3" />
            {canteen.faculty_location}
          </span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {canteen.description || 'Kantin menyediakan berbagai macam makanan sehat dan lezat.'}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-slate-700">
              {canteen.avgRating || 'Belum ada'} <span className="text-slate-400 font-normal">({canteen.reviewsCount || 0})</span>
            </span>
          </div>
          <Link 
            to={`/canteens/${canteen.id}`} 
            className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
          >
            Lihat Detail Audit
          </Link>
        </div>
      </div>
    </div>
  );
};
