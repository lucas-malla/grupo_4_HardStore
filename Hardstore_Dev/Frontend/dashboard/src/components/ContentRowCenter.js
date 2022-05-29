import React from 'react';
import LastProductInDb from './LastProductInDb';
import GenresInDb from './GenresInDb';
import LastUserInDb from './LastUserInDb'

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb />
            <LastUserInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}

export default ContentRowCenter;