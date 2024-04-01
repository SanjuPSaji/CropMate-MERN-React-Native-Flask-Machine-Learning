import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// import axios from "axios";
const id = Cookies.get('id');

const Update = () => {
    const [result, setResult] = useState(null);
    const [reloadPage, setReloadPage] = useState(false);
    // const [iid, setIid] = useState('');
    useEffect(() => {
        if (!id && !reloadPage) { // Check if id is not available and page reload is not done
            setReloadPage(true); // Set reloadPage to true to indicate page reload
            window.location.reload();
        }
    }, [id, reloadPage]);

    const [formData, setFormData] = useState({
        id: id,
        Nitrogen: '',
        Phosphorus: '',
        Potassium: '',
        Temperature: '',
        Humidity: '',
        pH: '',
        Rainfall: ''
    });



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            console.log(formData)

            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const predictdata = await response.json();
            setResult(predictdata.result);
            console.log(predictdata.Crop1);

            const datatoapi = await fetch('http://localhost:4999/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const detailsdata = await datatoapi.json();
            console.log(detailsdata.message); 

        } catch (error) {
            console.error('Error:', error);
        }
    };

   

    return (
        <div className="soil_container">
            <h3 >Crop Recommendation System <span role="img" aria-label="plant">🌱</span></h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="Nitrogen">Nitrogen </label>
                        <input
                            type="number"
                            id="Nitrogen"
                            name="Nitrogen"
                            placeholder="Enter Nitrogen"
                            className="form-control"
                            value={formData.Nitrogen}
                            onChange={handleChange}
                            min={"0"}
                            max={"150"}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Phosphorus">Phosphorus </label>
                        <input
                            type="number"
                            id="Phosphorus"
                            name="Phosphorus"
                            placeholder="Enter Phosphorus"
                            className="form-control"
                            value={formData.Phosphorus}
                            onChange={handleChange}
                            min={"0"}
                            max={"150"}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Potassium">Potassium </label>
                        <input
                            type="number"
                            id="Potassium"
                            name="Potassium"
                            placeholder="Enter Potassium"
                            className="form-control"
                            value={formData.Potassium}
                            onChange={handleChange}
                            min={"0"}
                            max={"250"}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Temperature">Temperature </label>
                        <input
                            type="number"
                            id="Temperature"
                            name="Temperature"
                            placeholder="Enter Temperature"
                            className="form-control"
                            value={formData.Temperature}
                            onChange={handleChange}
                            min={"0"}
                            max={"50"}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Humidity">Humidity </label>
                        <input
                            type="number"
                            id="Humidity"
                            name="Humidity"
                            placeholder="Enter Humidity"
                            className="form-control"
                            value={formData.Humidity}
                            onChange={handleChange}
                            min={"10"}
                            max={"100"}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pH">pH </label>
                        <input
                            type="number"
                            id="pH"
                            name="pH"
                            placeholder="Enter pH"
                            className="form-control"
                            value={formData.pH}
                            onChange={handleChange}
                            min={"2"}
                            max={"10"}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Rainfall">Rainfall </label>
                        <input
                            type="number"
                            id="Rainfall"
                            name="Rainfall"
                            placeholder="Enter Rainfall"
                            className="form-control"
                            value={formData.Rainfall}
                            onChange={handleChange}
                            min={"15"}
                            max={"300"}
                            required
                        />
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="">
                        <button type="submit">Update Details</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Update;
