import React from 'react';
import { useState, useEffect } from 'react'

function LastProductInDb(){
    const [lastInDb, setlastInDb] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/products/lastproduct")
            .then(response=> response.json())
            .then(lastProduct=>{
                setlastInDb(lastProduct.data[0])
            })
            .catch(err => console.log(err))
    }, [])
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last product in Data Base</h5>
                </div>
                <div className="card-body">
                <h5 className="m-0 font-weight-bold text-gray-800">{ lastInDb.product_name}</h5>
                <h6 className="m-0 font-weight-bold text-gray-800">$ { lastInDb.price} </h6>
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={lastInDb["images.image_name"]} alt=" Product image "/>
                    </div>
                    <p>{lastInDb.description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View product detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
