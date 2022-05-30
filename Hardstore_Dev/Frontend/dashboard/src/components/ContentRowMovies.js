import React from 'react';
import SmallCard from './SmallCard';
import { useState, useEffect } from 'react'

function ContentRowMovies(){

    const [totals, setTotals] = useState([]);

    //api calls

    useEffect(() => {
        fetch("http://localhost:3000/api/products/totals")
            .then(response=> response.json())
            .then(totals=>{
				console.log(totals)
                let totalProducts = {
                    title: 'Total de productos',
                    color: 'primary', 
                    cuantity: totals.data.products,
                    icon: 'fa-clipboard-list'
                }
                let totalUsers = {
                    title:' Total de usuarios', 
                    color:'success', 
                    cuantity: totals.data.users,
                    icon:'fa-user-check'
                }
                let totalCat = {
                    title:'Total de categorías' ,
                    color:'warning',
                    cuantity: totals.data.categories,
                    icon:'fa-award'
                }
                let newData = [totalProducts, totalUsers, totalCat]
                setTotals(newData)
				
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="row">
            
            {totals.map( (data, i) => {

                return <SmallCard {...data} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;