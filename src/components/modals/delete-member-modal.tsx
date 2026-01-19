import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";
import { deleteUser } from "../../lib/api";

interface Member {
  id: number;
  username: string;
  full_name?: string;
  email?: string;
  role_id?: number;
  role?: { id: number; name: string };
}

interface DeleteMemberModalProps {
  isOpen: boolean;
  member?: Member;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({
  isOpen,
  member,
  onClose,
  onSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!member) return;

    try {
      setIsDeleting(true);
      setError("");
      
      console.log("🗑️ Deleting user:", member.id);
      await deleteUser(member.id);
      
      console.log("✅ User deleted successfully");
      onClose();
      
      // Call onSuccess callback to refresh the list
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("❌ Failed to delete user:", err);
      setError(err.message || "Gagal menghapus user. Silakan coba lagi.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hapus Anggota">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle size={32} className="text-[#BE4139]" />
          </div>
        </div>

        <div>
          <p className="text-gray-800 font-medium">
            Apakah Anda yakin ingin menghapus data anggota ini?
          </p>
          <p className="text-gray-500 text-sm mt-1">
            "{member.full_name || member.username}" (ID: {member.id})
          </p>
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
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { DeleteMemberModal };
