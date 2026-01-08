// import express from "express";
// import cors from "cors";
// import axios from "axios";

// const app = express();

// // PENTING: Izinkan semua request dari frontend
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST"],
//   })
// );

// app.get("/", (req, res) => res.send("Backend Aktif!"));

// app.get("/api/proxy-download", async (req, res) => {
//   const { url, filename } = req.query;
//   console.log("📥 Mencoba mengunduh:", filename);

//   if (!url) return res.status(400).send("URL tidak ada");

//   try {
//     const response = await axios({
//       url: decodeURIComponent(url),
//       method: "GET",
//       responseType: "stream",
//     });

//     res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
//     res.setHeader("Content-Type", "image/jpeg");
//     response.data.pipe(res);
//   } catch (err) {
//     console.error("❌ Proxy Error:", err.message);
//     res.status(500).send("Gagal mengambil gambar dari Unsplash");
//   }
// });

// app.listen(5000, () => console.log("🚀 Server jalan di http://localhost:5000"));
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// 1. Config Dotenv Sederhana (Otomatis baca .env di folder yang sama)
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

app.get("/", (req, res) => res.send("Backend Proxy Aktif & Siap!"));

app.get("/api/unsplash", async (req, res) => {
  const { endpoint, query, page } = req.query;

  // 2. Baca Key dari .env lagi
  const API_KEY = "DZWyfKARwR58TrdDvVVrXSxEpBg7Z8nzvUcfCZv-YyI";

  console.log("Key Terbaca:", API_KEY ? "YA (Ada)" : "TIDAK (Kosong)");
  if (API_KEY) {
    console.log("Karakter awal key:", API_KEY.substring(0, 5));
  }
  console.log(
    `--- [Request]: ${endpoint} | Key Loaded: ${API_KEY ? "YES" : "NO"} ---`
  );

  if (!endpoint)
    return res.status(400).json({ error: "Endpoint harus diisi!" });
  if (!API_KEY)
    return res.status(500).json({ error: "API Key server tidak ditemukan" });

  try {
    const response = await axios.get(`https://api.unsplash.com/${endpoint}`, {
      params: {
        query: query || "",
        page: page || 1,
        per_page: 20,
        count: req.query.count || undefined,
      },
      headers: {
        Authorization: `Client-ID ${API_KEY.trim()}`, // .trim() membersihkan spasi tak terlihat
        "Accept-Version": "v1",
      },
      timeout: 5000,
    });
    return res.json(response.data);
  } catch (error) {
    console.error("❌ API Error:", error.response?.status || error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
});

// Proxy Download tetap sama
app.get("/api/proxy-download", async (req, res) => {
  const { url, filename } = req.query;
  if (!url) return res.status(400).send("URL tidak ada");
  try {
    const response = await axios({
      url: decodeURIComponent(url),
      method: "GET",
      responseType: "stream",
    });
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "image/jpeg"
    );
    response.data.pipe(res);
  } catch (err) {
    console.error("Download Error:", err.message);
    res.status(500).send("Gagal download");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});