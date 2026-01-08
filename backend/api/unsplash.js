import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/api/unsplash", async (req, res) => {
  // Ambil parameter dari URL
  const { endpoint, query, page } = req.query;
  const API_KEY = process.env.UNSPLASH_ACCESS_KEY;

  console.log(`--- Request Masuk: ${endpoint} ---`);

  // 1. Validasi Endpoint (Agar tidak gantung jika endpoint kosong)
  if (!endpoint) {
    return res
      .status(400)
      .json({ error: "Endpoint harus diisi! Contoh: ?endpoint=photos" });
  }

  try {
    // 2. Set timeout agar tidak loading selamanya jika internet lambat
    const response = await axios.get(`https://api.unsplash.com/${endpoint}`, {
      params: {
        query: query || "",
        page: page || 1,
        per_page: 20,
      },
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
        "Accept-Version": "v1",
      },
      timeout: 5000, // Maksimal 5 detik
    });

    console.log("✅ Berhasil dapat data!");
    return res.json(response.data); // Akhiri request dengan mengirim data
  } catch (error) {
    console.error("❌ ERROR DETECTED:");

    if (error.response) {
      // Unsplash merespon tapi error (401/403)
      console.error("Status:", error.response.status);
      console.error("Detail:", error.response.data);
      return res.status(error.response.status).json(error.response.data);
    } else {
      // Masalah koneksi atau server mati
      console.error("Message:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy siap di http://localhost:${PORT}`);
});
