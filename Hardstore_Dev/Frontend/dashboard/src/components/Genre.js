import React from 'react';

function Genre(props){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark  shadow">
                    <div className="card-body">
                        <h4>{props.category_name}</h4>
                        <p>{"Cantidad: " + props.count} </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Genre;