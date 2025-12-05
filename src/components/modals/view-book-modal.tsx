import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
}

interface ViewBookModalProps {
  isOpen: boolean;
  book?: Book;
  onClose: () => void;
}

const ViewBookModal: React.FC<ViewBookModalProps> = ({ isOpen, book, onClose }) => {
  if (!book) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Buku">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Judul</label>
          <p className="text-gray-800">{book.title}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Penulis</label>
          <p className="text-gray-800">{book.author}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">ISBN</label>
          <p className="text-gray-800">{book.isbn}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Kategori</label>
          <p className="text-gray-800">{book.category}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Jumlah</label>
          <p className="text-gray-800">{book.quantity}</p>
        </div>
        <div className="pt-4">
          <Button onClick={onClose} className="w-full">
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { ViewBookModal };
