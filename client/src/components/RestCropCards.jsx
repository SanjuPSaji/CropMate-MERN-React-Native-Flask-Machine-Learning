import React from 'react'

const RestCropCards = ({crops}) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{crops[1]}</h5>
        <p className="card-text">Details about {crops[1]}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{crops[2]}</h5>
        <p className="card-text">Details about {crops[2]}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{crops[3]}</h5>
        <p className="card-text">Details about {crops[3]}.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card">
      <img src="..." className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{crops[4]}</h5>
        <p className="card-text">Details about {crops[4]}.</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default RestCropCards