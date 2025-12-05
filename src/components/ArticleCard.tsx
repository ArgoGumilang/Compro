import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gray-200 border-b border-gray-200"></div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        <button className="text-[#BE4139] text-sm font-medium hover:text-[#a13830] transition-colors">
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
