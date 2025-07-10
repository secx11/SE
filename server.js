const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// إعداد CORS للسماح بالطلبات من نطاق GitHub Pages فقط
app.use(cors({
  origin: 'https://secx11.github.io', // السماح فقط من نطاق موقعك
  methods: ['POST', 'OPTIONS'], // السماح بطلبات POST وOPTIONS (preflight)
  allowedHeaders: ['Content-Type'], // السماح بترويسة Content-Type
  credentials: false // لا حاجة لتفعيل credentials في هذه الحالة
}));

app.use(express.json());

// التعامل مع طلبات OPTIONS بشكل صريح
app.options('/submit', cors({
  origin: 'https://secx11.github.io',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.post('/submit', async (req, res) => {
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(req.body)) {
    formData.append(key, value);
  }

  try {
    const response = await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfBKCbDVJ-ju6LuwL7qKXP2L7cav0wWQVv99ojK2b_HWpdMFw/formResponse", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (response.ok) {
      res.status(200).json({ message: "Form submitted successfully" });
    } else {
      console.error(`Failed to submit form: ${response.status} ${response.statusText}`);
      res.status(response.status).json({ error: `Failed to submit form: ${response.statusText}` });
    }
  } catch (error) {
    console.error("Error submitting to Google Forms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});