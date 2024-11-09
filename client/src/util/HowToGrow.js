const https = require("https");

const getGrowingSuggestion = (cropName) => {
  const options = {
    method: "POST",
    hostname: "chatgpt-42.p.rapidapi.com",
    path: "/chatgpt",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "7bce38cd3amsh65453d06db2dcd0p1f5ea6jsn8ca1bd5c29fb",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    },
  };

  const payload = JSON.stringify({
    messages: [{ role: "user", content: `How to grow ${cropName}?` }],
    web_access: false,
  });

  const req = https.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("Response:", JSON.parse(data));
    });
  });

  req.on("error", (e) => {
    console.error("Error:", e.message);
  });

  req.write(payload);
  req.end();
};

// Example usage:
const cropName = "tomato"; // Replace with any crop name you want to input
getGrowingSuggestion(cropName);