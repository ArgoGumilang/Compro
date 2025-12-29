import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface Article {
  title: string;
  description: string;
  coverImage?: string; 
}

interface Props {
  article: Article;
  onBack: () => void;
}

interface Comment {
  id: number;
  name: string;
  date: string;
  message: string;
}

/* =========================
   Helper: Format Tanggal ID
========================= */
const formatDateIndonesia = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BacaSelengkapnya: React.FC<Props> = ({ article, onBack }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Dinda",
      date: "12 September 2025",
      message: "Artikelnya bagus dan mudah dipahami ✨",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        name: "User",
        date: formatDateIndonesia(new Date()),
        message: newComment,
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Tombol Kembali */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 bg-[#BE4139] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#9e3530]"
      >
        <ChevronLeft size={18} />
        Kembali
      </button>

      {/* ================= HEADER ARTIKEL ================= */}
      <div
        className="h-80 rounded-2xl mb-8 relative overflow-hidden flex items-end"
        style={{
          backgroundImage: `url(${
            article.coverImage || "https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg?w=1024"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Konten Header */}
        <div className="relative z-10 p-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-white/90 mt-3 max-w-3xl leading-relaxed">
            {article.description}
          </p>
        </div>
      </div>

      {/* ================= ISI ARTIKEL ================= */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#BE4139] mb-10 space-y-6">
        <p className="text-gray-700 leading-relaxed indent-8">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
        </p>

        <p className="text-gray-700 leading-relaxed indent-8">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
        </p>

        <p className="text-gray-700 leading-relaxed indent-8">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
        </p>
      </div>

      {/* ================= KOMENTAR ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#BE4139]">
        <h3 className="text-xl font-bold text-[#BE4139] mb-4">
          Komentar
        </h3>

        {comments.map((c) => (
          <div key={c.id} className="mb-4 border-b pb-3 last:border-none">
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-400">{c.date}</p>
            <p className="text-gray-700 mt-1">{c.message}</p>
          </div>
        ))}

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar..."
          className="w-full border-2 rounded-xl p-3 mt-4 focus:outline-none focus:border-[#BE4139]"
        />

        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddComment}
            className="bg-[#BE4139] text-white px-5 py-2 rounded-xl font-semibold hover:bg-[#9e3530] transition"
          >
            Kirim Komentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BacaSelengkapnya;
