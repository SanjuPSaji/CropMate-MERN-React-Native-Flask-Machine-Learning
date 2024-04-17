import React from 'react'

const RestCropCards = ({crops}) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div className="card">
      <img src={crops[1].image} className="card-img-top" alt="crop img" style={{height:400, objectFit: "cover"}}/>
      <div className="card-body">
        <h2 className="card-title">{crops[1].name}</h2>
        <p className="card-text">{crops[1].description}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src={crops[2].image} className="card-img-top" alt="crop img" style={{height:400, objectFit: "cover"}}/>
      <div className="card-body">
        <h2 className="card-title">{crops[2].name}</h2>
        <p className="card-text">{crops[2].description}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src={crops[3].image} className="card-img-top" alt="crop img" style={{height:400, objectFit: "cover"}}/>
      <div className="card-body">
        <h2 className="card-title">{crops[3].name}</h2>
        <p className="card-text">{crops[3].description}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src={crops[4].image} className="card-img-top" alt="crop img" style={{height:400, objectFit: "cover"}}/>
      <div className="card-body">
        <h2 className="card-title">{crops[4].name}</h2>
        <p className="card-text">{crops[4].description}.</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default RestCropCards