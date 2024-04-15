const DataModel = require('../Models/DataModel');
const axios = require('axios');


module.exports.Data = async (req, res, next) => {
    const { id, Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall } = req.body;

    try {
        // Check if there's an existing document with the given id
        const existingData = await DataModel.findOne({ id });

        if (existingData) {
            // If document exists, update its fields
            existingData.Nitrogen = Nitrogen;
            existingData.Phosphorus = Phosphorus;
            existingData.Potassium = Potassium;
            existingData.Temperature = Temperature;
            existingData.Humidity = Humidity;
            existingData.pH = pH;
            existingData.Rainfall = Rainfall;

            // Save the updated document
            await existingData.save();
            res.status(200).json({ message: 'Data updated successfully' });
        } else {
            // If no document found with the given id, create a new one
            await DataModel.create({
                id,
                Nitrogen,
                Phosphorus,
                Potassium,
                Temperature,
                Humidity,
                pH,
                Rainfall
            });
            res.status(201).json({ message: 'Data added successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.Datafetch = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Check if there's an existing document with the given id
        const existingData = await DataModel.findOne({ id });

        if (existingData) {
            res.status(200).json({
                status: true,
                Nitrogen: existingData.Nitrogen,
                Phosphorus: existingData.Phosphorus,
                Potassium: existingData.Potassium,
                Temperature: existingData.Temperature,
                Humidity: existingData.Humidity,
                pH: existingData.pH,
                Rainfall: existingData.Rainfall
                
            });
        } else {
            res.status(200).json({ status: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.dataToML = async (req, res, next) => {
    const { id, Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall } = req.body;

    try {
        // Make a request to the Flask ML API
        const mlApiResponse = await axios.post('http://localhost:5000/predict', {
            id,
            Nitrogen,
            Phosphorus,
            Potassium,
            Temperature,
            Humidity,
            pH,
            Rainfall
        });

        // Optionally, you can handle the response from the ML API here

        // Return the response to the client (React Native app)
        res.status(200).json(mlApiResponse.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};