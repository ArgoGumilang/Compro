import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Search, Plus, Upload, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import TambahArtikelModal from '../components/modals/TambahArtikelModal';

interface Article {
  id: number;
  title: string;
  description: string;
}

const ArtikelPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState<boolean>(false);
  const totalPages = 68;

  // Sample article data
  const articles: Article[] = [
    {
      id: 1,
      title: "Judul Artikel",
      description: "Yagaingan diksi isi artikelnya tapi bukan isinya mungkin garis besarnya aja blabla yagining."
    },
    {
      id: 2,
      title: "Judul Artikel",
      description: "Yagaingan diksi isi artikelnya tapi bukan isinya mungkin garis besarnya aja blabla yagining."
    },
    {
      id: 3,
      title: "Judul Artikel",
      description: "Yagaingan diksi isi artikelnya tapi bukan isinya mungkin garis besarnya aja blabla yagining."
    },
    {
      id: 4,
      title: "Judul Artikel",
      description: "Yagaingan diksi isi artikelnya tapi bukan isinya mungkin garis besarnya aja blabla yagining."
    },
    {
      id: 5,
      title: "Judul Artikel",
      description: "Yagaingan diksi isi artikelnya tapi bukan isinya mungkin garis besarnya aja blabla yagining."
    },
    {
      id: 6,
      title: "Judul Artikel",
      description: "Yagaingan diksi isi artikelnya tapi bukan isinya mungkin garis besarnya aja blabla yagining."
    }
  ];

  const renderPaginationButtons = (): React.ReactElement[] => {
    const buttons: React.ReactElement[] = [];
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
          currentPage === 1 ? 'text-gray-400' : 'text-[#BE4139] hover:text-[#9e3530] hover:bg-white hover:shadow-md'
        }`}
      >
        ← Previous
      </button>
    );

    // Page numbers
    if (currentPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="px-4 py-2 text-sm font-semibold text-[#BE4139] hover:bg-white rounded-xl hover:shadow-md transition-all duration-300"
        >
          1
        </button>
      );
    }

    buttons.push(
      <button
        key={currentPage}
        className="px-4 py-2 text-sm bg-[#BE4139] text-white rounded-xl font-bold shadow-lg transform scale-110"
      >
        {currentPage}
      </button>
    );

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key={currentPage + 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 text-sm font-semibold text-[#BE4139] hover:bg-white rounded-xl hover:shadow-md transition-all duration-300"
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="dots" className="px-2 text-[#BE4139] font-bold">
          ✨
        </span>
      );
    }

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key={totalPages - 1}
          onClick={() => setCurrentPage(totalPages - 1)}
          className="px-4 py-2 text-sm font-semibold text-[#BE4139] hover:bg-white rounded-xl hover:shadow-md transition-all duration-300"
        >
          {totalPages - 1}
        </button>
      );
    }

    buttons.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className="px-4 py-2 text-sm font-semibold text-[#BE4139] hover:bg-white rounded-xl hover:shadow-md transition-all duration-300"
      >
        {totalPages}
      </button>
    );

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
          currentPage === totalPages ? 'text-gray-400' : 'text-[#BE4139] hover:text-[#9e3530] hover:bg-white hover:shadow-md'
        }`}
      >
        Next →
      </button>
    );

    return buttons;
  };

  return (
    <>
      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139] mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-[#BE4139]" size={20} />
            <Input
              placeholder="✨ Cari artikel seru..."
              className="pl-10 bg-white border-2 border-gray-300 rounded-xl focus:border-[#BE4139] transition-all duration-300"
            />
          </div>
          <Button 
            onClick={() => setIsTambahModalOpen(true)}
            className="gap-2 text-white bg-[#BE4139] hover:bg-[#9e3530] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Plus size={18} />
            Tambah Artikel
          </Button>
          <Button className="gap-2 text-white bg-[#BE4139] hover:bg-[#9e3530] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
            <Upload size={18} />
            Import
          </Button>
          <Button variant="outline" className="gap-2 border-2 border-[#BE4139] bg-white rounded-xl hover:bg-gray-50 hover:border-[#9e3530] transition-all duration-300 font-semibold">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8 bg-white p-4 rounded-2xl shadow-md border-2 border-[#BE4139]">
        {renderPaginationButtons()}
      </div>

      {/* Tambah Artikel Modal */}
      <TambahArtikelModal
        isOpen={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
      />
    </>
  );
};

export default ArtikelPage;
