export const fakeLoginApi = async (
  username: string,
  password: string
) => {
  return new Promise<{ token: string; role: string }>((resolve, reject) => {
    setTimeout(() => {
      // ADMIN
      if (username === "admin" && password === "admin123") {
        resolve({
          token: "fake-jwt-admin",
          role: "Administrator",
        });
        return;
      }

      // ANGGOTA
      if (username === "anggota" && password === "anggota123") {
        resolve({
          token: "fake-jwt-anggota",
          role: "Anggota",
        });
        return;
      }

      reject(new Error("Username atau password salah"));
    }, 1000);
  });
};
