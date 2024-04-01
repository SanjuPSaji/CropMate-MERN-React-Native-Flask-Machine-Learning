import React from 'react'

const TopCropCard = ({ crop }) => {
    return (
        <div className="card mb-3">
        <img src="..." className="card-img-top" alt="crop img"/>
        <div className="card-body">
          <h1 className="card-title">{crop}</h1>
          <p className="card-text">Details about {crop}.</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    );
  }
  

export default TopCropCard