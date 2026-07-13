import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
}

export default function CategoryCard({ name, image, count }: CategoryCardProps) {
  return (
    <Link
      to={`/search?category=${encodeURIComponent(name)}`}
      className="group flex flex-col items-center space-y-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-xl hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-semibold text-slate-100 group-hover:text-orange-400 transition-colors text-center">
        {name}
      </span>
      <span className="text-xs text-slate-400">{count} places</span>
    </Link>
  );
}
