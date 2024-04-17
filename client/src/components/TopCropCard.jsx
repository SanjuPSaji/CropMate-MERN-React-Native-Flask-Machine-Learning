import React from 'react'

const TopCropCard = ({ crop }) => {
    return (
        // <div className="card mb-3">
        <div className="card text-black mb-3">
  <img src={crop.image} className="card-img" alt="..." style={{height:400, objectFit: "cover"}}/>
  <div className="card-img-overlay"></div>
    <h5 className="card-title " style={{fontSize:60,marginLeft:15}}>{crop.name}</h5>
  
    <p className="card-text" style={{fontSize:35,marginLeft:15}}>{crop.description}</p>
    <p className="card-text"style={{fontSize:15,marginLeft:15}}>Based on the crop details you provided, {crop.name} is the best crop to grow in your farm</p>
</div>
      // </div>
    );
  }
  

export default TopCropCard