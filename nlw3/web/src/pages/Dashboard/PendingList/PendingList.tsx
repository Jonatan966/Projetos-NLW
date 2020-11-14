import React, { useEffect, useState } from 'react';

import NothingBox from '../../../components/NothingBox';
import OrphanageCard from '../../../components/OrphanageCard';
import api from '../../../Services/api';
import { Orphanage } from '../../../utils/globalInterfaces';

const PendingList: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [mode, setMode] = useState<"view" | "pending" | "editable">('view');

    useEffect(() => {
        api.get('/user/orphanages?pending=1').then(results => {
            if (!results.data.length) {
                api.get('/user/orphanages?my=1&pending=1').then(results => {
                    if (results.status === 200) {
                        setOrphanages(results.data);
                    }
                });
                return;
            }
            setMode('pending');
            setOrphanages(results.data);
        });
    }, []);

    return (
        <>
            <label className="orphanages-header">
                <h1>Cadastros Pendentes</h1>
                <span>{orphanages.length} orfanatos</span>
            </label>
        
            <div className="orphanage-list">
            {
                    orphanages.length ?
                    orphanages.map((orphanage, x) => {
                        return <OrphanageCard orphanage={orphanage} key={x} mode={mode}/>
                    }) :
                    <NothingBox/>
                }
            </div>

        </>
    );
}

export default PendingList;