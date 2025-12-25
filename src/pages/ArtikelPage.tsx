import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Search, Plus, Upload, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import TambahArtikelModal from '../components/modals/TambahArtikelModal';
import BacaSelengkapnya from './BacaSelengkapnya';

interface Article {
  id: number;
  title: string;
  description: string;
}

const ArtikelPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const totalPages = 68;

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

  // 👉 kalau artikel dipilih, pindah ke halaman baca selengkapnya
  if (selectedArticle) {
    return (
      <BacaSelengkapnya
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  const renderPagination = () => {
    const pages = [];

    pages.push(
      <button
        key="prev"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="flex items-center gap-1 px-4 py-2 text-[#BE4139] hover:text-[#9e3530] disabled:opacity-50 font-semibold rounded-xl hover:bg-white"
      >
        ← Previous
      </button>
    );

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded-xl font-bold ${
            currentPage === i
              ? 'bg-[#BE4139] text-white'
              : 'text-[#BE4139] hover:bg-white'
          }`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > 5) {
      pages.push(
        <span key="dots" className="px-2 text-[#BE4139]">✨</span>
      );
    }

    pages.push(
      <button
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="flex items-center gap-1 px-4 py-2 text-[#BE4139] hover:text-[#9e3530] disabled:opacity-50 font-semibold rounded-xl hover:bg-white"
      >
        Next →
      </button>
    );

    return pages;
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
              className="pl-10 bg-white border-2 border-gray-300 rounded-xl"
            />
          </div>

          <Button
            onClick={() => setIsTambahModalOpen(true)}
            className="gap-2 bg-[#BE4139] hover:bg-[#9e3530] rounded-xl"
          >
            <Plus size={18} />
            Tambah Artikel
          </Button>

          <Button className="gap-2 bg-[#BE4139] hover:bg-[#9e3530] rounded-xl">
            <Upload size={18} />
            Import
          </Button>

          <Button variant="outline" className="gap-2 border-[#BE4139] rounded-xl">
            <Filter size={18} />
            Filter
          </Button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            <ArticleCard
              title={article.title}
              description={article.description}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-4 border-t-2 border-[#BE4139] flex items-center justify-center gap-1">
        {renderPagination()}
      </div>

      {/* ✅ PERBAIKAN: MODAL DITAMBAHKAN LAGI */}
      <TambahArtikelModal
        isOpen={isTambahModalOpen}
        onClose={() => setIsTambahModalOpen(false)}
      />
    </>
  );
};

export default ArtikelPage;
