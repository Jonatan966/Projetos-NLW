import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import excludeImg from '../../images/orphanage-exclusion.svg';
import api from '../../Services/api';
import { Orphanage } from '../../utils/globalInterfaces';
import {Container} from './styles';

const OrphanageExclusion: React.FC = () => {
    const page = useHistory();
    const params = useParams<{id: string}>();
    const [orphanage, setOrphanage] = useState({name: '. . .', id: -1} as Orphanage);

    async function handleDelete() {
        try {
            const result = await api.delete(`/user/orphanages/${orphanage.id}`);

            if (result.status === 200) {
                alert('Orfanato excluido com sucesso!');
            }
            else alert('Ocorreu um erro ao tentar excluir esse orfanato :(');
        }
        catch {
            alert('Ocorreu um erro ao tentar excluir esse orfanato :(');
        }
        finally { page.replace('/dashboard'); }
    }

    useEffect(() => {
        console.log('mudou')
        api.get(`/user/orphanages/${params.id}`).then(results => {
            if (results.data) {
                setOrphanage(results.data);
            }    
        });
    }, []);

    return (
        <Container
            image={excludeImg}
            backgroundColor="#FF669D"
            btnDefaultColor="#c42c2c"
            btnHoverColor="#fa8585"
        >
            <div className="content">
                <h1>Excluir!</h1>
                <p>
                    Você tem certeza que quer
                    excluir <strong>{orphanage.name}</strong>?
                </p>

                <span>
                    <Link className="no" to="/dashboard">Não</Link>
                    <button onClick={handleDelete}>Sim</button>
                </span>
            </div>

        </Container>
    );
}

export default OrphanageExclusion;