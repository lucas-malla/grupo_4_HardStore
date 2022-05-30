import React, {Component} from 'react';
import Genre  from './Genre';
import {useState, useEffect} from 'react'

function GenresInDb() {

  let [categories, setCategories] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/api/products/categories')
      .then(response=> response.json())
      .then(categories=>{
        setCategories(categories)
      })
    },[])

    let animate = ()=>{
        let card = document.querySelector('h6')
        card.classList.toggle('bg-secondary')
    }

    return (
        <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 onMouseOver={animate} className="m-0 font-weight-bold text-gray-800">Products categories</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                  categories.map((category,index)=>{
                                      return  <Genre  {...category}  key={index} />
                                  })
                                }
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}
export default GenresInDb;
