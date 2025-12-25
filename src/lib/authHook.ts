import { useState } from "react";

export function useAuth() {
  // dummy user state
  const [user] = useState<{ role: "admin" | "anggota" }>({ role: "anggota" });
  return { user };
}
