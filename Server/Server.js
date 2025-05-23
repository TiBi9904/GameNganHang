// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend MBbank Game đang hoạt động!");
});

app.post("/api/check-account", async (req, res) => {
  const { accountNo } = req.body;

  try {
    const response = await fetch("https://api.vietqr.io/v2/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bin: "970422", // MBBank
        accountNo,
        accountType: "personal",
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Lỗi gọi API VietQR:", err);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend NodeJS đang chạy tại http://localhost:${PORT}`);
});
