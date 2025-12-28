import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { checkIn, getUserByBarcode } from "../lib/api";

// ================== Helpers ==================
const todayLong = format(new Date(), "EEEE, dd MMMM yyyy", { locale: idLocale });
const toWIB = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  }).format(d);

export default function BarcodePage() {
  const [role, setRole] = useState<"siswa" | "guru">("siswa");
  const [userData, setUserData] = useState<{ name: string; role: string } | null>(null);
  const [ts, setTs] = useState(toWIB(new Date()));
  const [captured, setCaptured] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTs(toWIB(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  async function startCamera() {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setStream(media);
      if (videoRef.current) {
        videoRef.current.srcObject = media;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      }
    } catch (err) {
      console.error(err);
      alert("Kamera tidak dapat diakses.");
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach((t) => t.stop());
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return alert("Kamera belum siap");

    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(-1, 1); // flip horizontal
    ctx.drawImage(video, -w, 0, w, h);
    ctx.scale(-1, 1);

    const overlayLines = [
      `Role: ${role}`,
      `Waktu: ${ts} WIB`,
      "Selfie via Selaras",
    ];
    const padding = 12;
    const lineHeight = 18;
    const boxHeight = padding * 2 + lineHeight * overlayLines.length;
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, h - boxHeight, w, boxHeight);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 14px Inter, sans-serif";
    overlayLines.forEach((line, i) =>
      ctx.fillText(line, padding, h - boxHeight + padding + lineHeight * (i + 0.2))
    );

    setCaptured(canvas.toDataURL("image/jpeg", 0.9));
  }

  async function onScanBarcode() {
    if (!captured) return alert("Ambil foto dulu untuk scan barcode!");
    setLoading(true);
    try {
      const res = await getUserByBarcode(captured);
      setUserData(res); // { name, role }
    } catch (err) {
      console.error(err);
      alert("Barcode tidak valid atau user tidak ditemukan.");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit() {
    if (!captured || !userData) return alert("Ambil foto dan scan barcode dulu!");
    setLoading(true);
    try {
      const response = await fetch(captured);
      const blob = await response.blob();
      const file = new File([blob], `selfie_${role}_${Date.now()}.jpg`, { type: "image/jpeg" });

      await checkIn({ photo: file, role }); // ✅ role dikenali
      alert("Check-in berhasil!");
      setCaptured(null);
      setUserData(null);
    } catch (err) {
      console.error(err);
      alert("Check-in gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <header className="bg-[#BE4139] rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
        <h1 className="text-4xl font-bold text-white">Scan kartu untuk presensi</h1>
        <div className="text-1xl font-semibold text-white">{todayLong}</div>
      </header>

      {/* Pilih Role */}
      <div className="bg-white rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
        <label className="font-semibold text-gray-700 mr-4">Pilih Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "siswa" | "guru")}
          className="border rounded-md px-3 py-1"
        >
          <option value="siswa">Siswa</option>
          <option value="guru">Guru</option>
        </select>
      </div>

      {/* Kamera & Capture */}
      <div className="bg-white rounded-2xl border-2 border-[#BE4139] p-6 shadow-xl">
        <div className="text-xl font-semibold text-gray-700">Ambil Foto / Scan Kartu</div>
        <div className="rounded-xl border overflow-hidden mt-4 mb-4">
          {captured ? (
            <img src={captured} alt="Captured" className="w-full max-h-80 object-contain bg-black" />
          ) : (
            <video ref={videoRef} className="w-full max-h-80 object-contain bg-black" playsInline muted />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="flex gap-2">
          <button onClick={capturePhoto} className="px-4 py-2 rounded-lg bg-[#BE4139] text-white font-semibold shadow hover:shadow-md">
            {captured ? "Ambil Ulang" : "Ambil Foto"}
          </button>
          {captured && (
            <button onClick={onScanBarcode} className="px-4 py-2 rounded-lg border border-gray-500 text-gray-700 font-semibold hover:bg-gray-200">
              Scan Barcode
            </button>
          )}
        </div>
      </div>

      {/* User Info */}
      {userData && (
        <div className="bg-white rounded-xl border shadow p-4">
          <h3 className="text-lg font-bold text-gray-700">Data User</h3>
          <p>Nama: {userData.name}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}

      {/* Submit */}
      {captured && userData && (
        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Check In"}
          </button>
        </div>
      )}
    </div>
  );
}
