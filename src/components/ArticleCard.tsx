import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#BE4139] overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-[#BE4139] border-b-2 border-[#BE4139] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-all duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="p-5 bg-white">
        <h3 className="font-bold text-gray-800 mb-3 text-lg group-hover:text-[#BE4139] transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        <button className="text-white bg-[#BE4139] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#9e3530] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
