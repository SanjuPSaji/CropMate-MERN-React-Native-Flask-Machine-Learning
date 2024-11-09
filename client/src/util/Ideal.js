import axios from 'axios';


const getSoilAdjustmentSuggestion = async (cropName, soilConditions) => {
  const url = "https://chatgpt-42.p.rapidapi.com/chatgpt";
  const headers = {
    "Content-Type": "application/json",
    "x-rapidapi-key": "7bce38cd3amsh65453d06db2dcd0p1f5ea6jsn8ca1bd5c29fb",
    "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
  };

  // Format the soil conditions into a readable string for GPT
  const conditionsText = `Nitrogen: ${soilConditions[0]}, Phosphorus: ${soilConditions[1]}, Potassium: ${soilConditions[2]}, Temperature: ${soilConditions[3]}°C, Humidity: ${soilConditions[4]}%, pH: ${soilConditions[5]}, Rainfall: ${soilConditions[6]} mm`;

  const payload = {
    messages: [
      {
        role: "user",
        content: `Given the following soil conditions for ${cropName}:
        ${conditionsText}.
        
        Please compare these values to the ideal conditions for growing ${cropName} and suggest adjustments the farmer should make to optimize the soil and environment for this crop.`,
      },
    ],
    web_access: false,
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Example usage:
const cropName = "wheat"; // Replace with the desired crop
const soilConditions = [40, 20, 30, 25, 60, 6.5, 200]; // Example: [Nitrogen, Phosphorus, Potassium, Temp (°C), Humidity (%), pH, Rainfall (mm)]
getSoilAdjustmentSuggestion(cropName, soilConditions);
