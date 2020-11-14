import React, { useEffect, useState } from 'react';
import NothingBox from '../../../components/NothingBox';
import OrphanageCard from '../../../components/OrphanageCard';
import api from '../../../Services/api';
import { Orphanage } from '../../../utils/globalInterfaces';

const OrphanagesList: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('/user/orphanages?my=true').then(results => {
            if (results.status === 200) {
                setOrphanages(results.data);
            }
        });
    }, []);

    return (
        <>
            <label className="orphanages-header">
                <h1>Orfanatos Cadastrados</h1>
                <span>{orphanages.length} orfanatos</span>
            </label>
        
            <div className="orphanage-list">
                {
                    orphanages.length ?
                    orphanages.map((orphanage, x) => {
                        return <OrphanageCard orphanage={orphanage} key={x}/>
                    }) :
                    <NothingBox/>
                }
            </div>

        </>
    );
}

export default OrphanagesList;