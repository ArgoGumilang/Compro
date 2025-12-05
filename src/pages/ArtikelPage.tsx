import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Search, Plus, Upload, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface Article {
  id: number;
  title: string;
  description: string;
}

const ArtikelPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        className={`px-3 py-1 text-sm ${
          currentPage === 1 ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'
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
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          1
        </button>
      );
    }

    buttons.push(
      <button
        key={currentPage}
        className="px-3 py-1 text-sm bg-gray-800 text-white rounded"
      >
        {currentPage}
      </button>
    );

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key={currentPage + 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="dots" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key={totalPages - 1}
          onClick={() => setCurrentPage(totalPages - 1)}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          {totalPages - 1}
        </button>
      );
    }

    buttons.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
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
        className={`px-3 py-1 text-sm ${
          currentPage === totalPages ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'
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
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder="Cari"
              className="pl-10 bg-gray-50 border-gray-300"
            />
          </div>
          <Button className="gap-2 text-white bg-[#BE4139] hover:bg-[#A03A2F]">
            <Plus size={18} />
            Tambah Artikel
          </Button>
          <Button className="gap-2 text-white bg-[#BE4139] hover:bg-[#A03A2F]">
            <Upload size={18} />
            Import
          </Button>
          <Button variant="outline" className="gap-2 border-gray-300 bg-transparent">
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
      <div className="flex items-center justify-center space-x-2 mt-8">
        {renderPaginationButtons()}
      </div>
    </>
  );
};

export default ArtikelPage;
