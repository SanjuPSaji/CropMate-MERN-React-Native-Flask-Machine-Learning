const CropModel = require('../Models/CropModel');

module.exports.Crop = async (req, res, next) => {
    const { id, Crop1, Crop2, Crop3, Crop4, Crop5 } = req.body;

    try {
        // Check if there's an existing document with the given id
        const existingData = await CropModel.findOne({ id });

        if (existingData) {
            // If document exists, update its fields
            existingData.Crop1 = Crop1;
            existingData.Crop2 = Crop2;
            existingData.Crop3 = Crop3;
            existingData.Crop4 = Crop4;
            existingData.Crop5 = Crop5;

            // Save the updated document
            await existingData.save();
            res.status(200).json({ message: 'Data updated successfully' });
        } else {
            // If no document found with the given id, create a new one
            await CropModel.create({
                id,
                Crop1,
                Crop2,
                Crop3,
                Crop4,
                Crop5,
            });
            res.status(201).json({ message: 'Data added successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.Cropfetch = async (req, res, next) => {
    const { id } = req.body;

    try {
        // Check if there's an existing document with the given id
        const existingCrop = await CropModel.findOne({ id });

        if (existingData) {
            res.status(200).json({
                status: true,
                Crop1: existingData.Crop1,
                Crop2: existingData.Crop2,
                Crop3: existingData.Crop3,
                Crop4: existingData.Crop4,
                Crop5: existingData.Crop5,
                
            });
        } else {
            res.status(200).json({ status: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
