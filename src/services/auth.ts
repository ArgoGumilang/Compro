export const fakeLoginApi = async (
  username: string,
  password: string
) => {
  return new Promise<{ token: string; role: string }>((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        resolve({
          token: "fake-jwt-token",
          role: "Administrator",
        });
      } else {
        reject(new Error("Username atau password salah"));
      }
    }, 1000);
  });
};
