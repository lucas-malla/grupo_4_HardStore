import React from 'react';
import ChartRow from './ChartRow';
import { useState, useEffect } from 'react'


function Chart(){

    let [products, setProducts] = useState([])
    let [page, setPage] = useState(1)

    useEffect(()=>{
        fetch(`http://localhost:3000/api/products/?page=${page}`)
            .then(response=> response.json())
            .then(productss=>{
                setProducts(productss.data)
            })
        },[page])
    let showMore = (e)=>{
        setPage(page+1)
    }
    let showless = (e)=>{
        if (page != 1){
            setPage(page-1)
        }
    }
    return(
        <React.Fragment>
            <div className="container-sm">
                        <div className="filt-ord">
                            <p className="filtro-desplegable">Filtrar: <i className="fas fa-sort-down"></i></p>
                            <p className="ordenar-por">Ordenar por: <i className="fas fa-sort-down"></i></p>
                        </div>
                    <div style={{"maxWidth": '1000px' , "margin": '0 auto'}}>
                    <div className="options crear"><a href="/admin/products/create" className="action-button edit crear">CREAR NUEVO</a>
                    </div>
                    <hr/>
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Título</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Promoción</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            products.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }
                        </tbody>
                    </table>
                        <button onClick={showless}>Previous</button>
                        <button onClick={showMore}>Next</button>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Chart;




