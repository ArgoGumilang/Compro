// dummy API functions
// src/lib/api.ts

// checkIn menerima photo + optional role
export async function checkIn({ photo, role }: { photo: File; role?: "siswa" | "guru" }) {
  console.log("checkIn called", { photo, role });
  return { late_minutes: 0 };
}

// dummy API untuk scan barcode
export async function getUserByBarcode(barcode: string) {
  // contoh fetch ke backend
  const res = await fetch(`/api/users/barcode/${barcode}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

export async function getMyProjects() {
  // dummy project list
  return [
    {
      id: 1,
      name: "Guru",
      role: "Guru",
    },
    {
      id: 2,
      name: "Siswa",
      role: "Siswa"
    },
  ];
}
