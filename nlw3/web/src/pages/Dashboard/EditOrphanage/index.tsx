import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FiCheck, FiXCircle } from "react-icons/fi";

import api from "../../../Services/api";
import SideBar from "../../../components/SideBar";
import { Form, Input, MapPicker, TextArea, ImagePicker, DecisionBox } from "../../../components/Form";
import { Orphanage } from "../../../utils/globalInterfaces";
import LoadingScreen from "../../Messages/LoadingScreen";

import { ManipulateOrphanageContainer } from "../styles";
import { validadeOrphanage } from "../../../Services/validations";

const EditOrphanage: React.FC<{mode: 'edit' | 'confirm' | 'view'}> = ({mode = 'edit'}) => {
  const history = useHistory();
  const param = useParams<{id: string}>();
  const formRef = useRef(null);
  const [orphanage, setOrphanage] = useState({} as Orphanage);

  useEffect(() => {
    api.get(`/user/orphanages/${param.id}?complete=1`).then(async (results) => {
      if (results.status === 200) {
        await (new Promise(resolve => setTimeout(resolve, 500)));
        setOrphanage(results.data);
      }
    });
  }, []);

  async function handleSubmit(data: any) {
    if (await validadeOrphanage(data, formRef, false)) {
      const sender = new FormData();

      for (var key in data) {
        if (key !== 'images') {
          sender.append(key, data[key]);
          continue;
        }
        
        data[key].forEach((item: any) => {
          sender.append(key, item);
        });
      }
  
      const results = await api.put(`orphanages/${orphanage.id}`, data);
  
      if (results.status === 200) {
        alert('Editado com sucesso!')
        history.push('/dashboard');  
      }  
    }
  }

  async function handleApprove() {
    try {
      const result = await api.get(`orphanages/${orphanage.id}/approve`);

      if (result.status === 200) {
        alert('Orfanato aprovado com sucesso!')
        history.replace('/dashboard');
      }
    }
    catch {
      alert('Ocorreu um problema ao tentar aprovar esse orfanato');
    }
  }

  async function handleRefuse() {
    try {
      const result = await api.delete(`user/orphanages/${orphanage.id}`);

      if (result.status === 200) {
        alert('Orfanato recusado com sucesso!');
        history.replace('/dashboard');
      }
    }
    catch {
      alert('Ocorreu um problema ao tentar recusar esse orfanato');
    }
  }
  
  if (!orphanage.id) {
    return <LoadingScreen/>;
  }

  return (
    <ManipulateOrphanageContainer>
      <SideBar />
      <main>
        <span>Editar um orfanato</span>
        <Form ref={formRef} onSubmit={mode === 'edit' ? handleSubmit : () => {}} initialData={orphanage}>
          <fieldset>
            <legend>Dados</legend>

            <MapPicker
              disabled={mode!=='edit'}
            >
              <p>Selecione um novo ponto no mapa</p>
            </MapPicker>

            <Input
              name="name"
              title="Nome"
              disabled={mode!=='edit'}
            />

            <TextArea
              title="Sobre"
              name="about"
              disabled={mode!=='edit'}
            />
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <TextArea
              title="Instruções"
              name="instructions"
              disabled={mode!=='edit'}
            />

            <Input
              title="Horário de funcionamento"
              name="opening_hours"
              disabled={mode!=='edit'}
            />

            <ImagePicker 
              name="images"
              disabled={mode!=='edit'}
            />

            <DecisionBox 
              title="Atende fim de semana" 
              name="open_on_weekends"
              disabled={mode!=='edit'}
            />
          </fieldset>

          { mode === 'edit' && <button className="confirm-button" type='submit'>Confirmar</button> }

          {
            mode === 'confirm' &&
            (
              <div className="btn-group">
                <button onClick={handleRefuse} className="confirm-button denied" type="button">
                  <FiXCircle size={25} color="#fff"/> Recusar
                </button>
                <button onClick={handleApprove} className="confirm-button" type="button">
                  <FiCheck size={25} color="#fff"/> Aceitar
                </button>
              </div>
            )
          }
        </Form>
      </main>
    </ManipulateOrphanageContainer>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
export default EditOrphanage;