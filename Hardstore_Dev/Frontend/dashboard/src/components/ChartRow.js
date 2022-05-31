import React from 'react';

function ChartRow(props){
    return (
        <tr>
            <th className="row"><div className="img"><img className="medida" src={props['images.image_name']}/></div></th>
            <td>
                {props.product_name}
            </td>
            <td >
                <del>{props.price}</del>
            </td>
            <td>{props.price * (100-props.discount)/100}</td>
            <td>
                {props.discount}% OFF
            </td>
            <td>
                <div className="options">
                    <a href="/admin/products/<%= product.id %>/edit"
                        className="action-button edit">MODIFICAR</a>
                    <form action="/admin/delete/<%= product.id %>?_method=DELETE" method="POST">
                        <button type="submit" className="action-button delete">ELIMINAR</button>
                    </form>
                </div>
            </td>
        </tr>
    )
}
    
export default ChartRow;
