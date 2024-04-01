import React from 'react'

const RestCropCards = ({crops}) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="crop img"/>
      <div className="card-body">
        <h2 className="card-title">{crops[1]}</h2>
        <p className="card-text">Details about {crops[1]}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="crop img"/>
      <div className="card-body">
        <h2 className="card-title">{crops[2]}</h2>
        <p className="card-text">Details about {crops[2]}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="crop img"/>
      <div className="card-body">
        <h2 className="card-title">{crops[3]}</h2>
        <p className="card-text">Details about {crops[3]}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="crop img"/>
      <div className="card-body">
        <h2 className="card-title">{crops[4]}</h2>
        <p className="card-text">Details about {crops[4]}.</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default RestCropCards