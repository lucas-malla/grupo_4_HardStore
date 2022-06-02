import React, { useState, useEffect } from 'react';
import ChartRow from './ChartRow';
import '../assets/css/bootstrap.min.css'
import '../assets/css/prod_gal.css';


function Chart(){

    let [products, setProducts] = useState([])
    let [page, setPage] = useState(1)
    let [totalsProducts, setTotalsProducts] = useState(0)

    useEffect(()=>{
        fetch(`http://localhost:3000/api/products/?page=${page}`)
            .then(response=> {
               return response.json()
            })
            
            .then(productss=>{
                setProducts(productss.data)
            })
            totalPages();
        },[page])

    const totalPages = () => {
        fetch(`http://localhost:3000/api/products/totals`)
        .then(response=> {
            return response.json()
        })
        
        .then(totals=>{
            setTotalsProducts(totals.data.products)
        })
    }

    const totalPaginas = Math.ceil(totalsProducts / 5)

    let showMore = (e)=>{
        if( totalPaginas > page){
            setPage(page+1)
        }
    }
    let showless = (e)=>{
        if (page != 1){
            setPage(page-1)
        }
    }
    return(
        <main>
            <div className="card shadow mb-12">
                    <div className="card header py-3">
                        <div className=" d-md-flex justify-content-md-end"><a href="/admin/products/create" className="btn btn-lg edit crear">CREAR NUEVO</a>
                        </div>
                    </div>
                    
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
                    <div className='d-grid gap-2 d-md-flex mx-auto mb-3'>
                        <button className='btn btn-primary' onClick={showless}>Previous</button>
                        <button className='btn btn-primary' onClick={showMore}>Next</button>
                    </div>      
                </div>
        </main>
    )
}

export default Chart;
