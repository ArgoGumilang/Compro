import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';
import { deleteBook } from '../../lib/api';

interface Book {
  id: number;
  title: string;
  author?: { id: number; name: string };
  isbn?: string;
  category?: { id: number; name: string };
  quantity?: number;
}

interface DeleteBookModalProps {
  isOpen: boolean;
  book?: Book;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ isOpen, book, onClose, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!book) return;

    try {
      setIsDeleting(true);
      setError('');
      
      console.log('🗑️ Deleting book:', book.id);
      await deleteBook(book.id);
      
      console.log('✅ Book deleted successfully');
      onClose();
      
      // Call onSuccess callback to refresh the list
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('❌ Failed to delete book:', err);
      setError(err.message || 'Gagal menghapus buku. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!book) return null;

  const authorName = typeof book.author === 'object' ? book.author?.name : book.author;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus Buku">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle size={32} className="text-[#BE4139]" />
          </div>
        </div>
        <div>
          <p className="text-gray-800 font-medium">Apakah Anda yakin ingin menghapus buku ini?</p>
          <p className="text-gray-500 text-sm mt-1">"{book.title}" {authorName ? `oleh ${authorName}` : ''}</p>
        </div>
        <p className="text-gray-500 text-sm">
          Tindakan ini tidak dapat dibatalkan.
        </p>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            disabled={isDeleting}
            className="flex-1"
          >
            Batal
          </Button>
          <Button 
            type="button" 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="flex-1 bg-[#BE4139] hover:bg-[#a13830] disabled:opacity-50"
          >
            {isDeleting ? 'Menghapus...' : 'Hapus'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { DeleteBookModal };
