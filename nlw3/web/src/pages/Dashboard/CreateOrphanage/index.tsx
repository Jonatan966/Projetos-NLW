import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { Form, Input, TextArea, MapPicker, ImagePicker, DecisionBox } from "../../../components/Form";
import api from "../../../Services/api";
import SideBar from "../../../components/SideBar";
import { validadeOrphanage } from "../../../Services/validations";

import { ManipulateOrphanageContainer } from "../styles";

export default function CreateOrphanage() {
  const history = useHistory();
  const formRef = useRef(null as any);

  async function handleSubmit(data: any) {
    if (await validadeOrphanage(data, formRef)) {
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
      
      const results = await api.post('orphanages', sender);
  
      if (results.status === 201) {
        console.log(results.data);
        history.push('/dashboard/message/success');  
      }  
    }
    
  }
 
  return (
    <ManipulateOrphanageContainer>
      <SideBar />
      <main>
        <span>Adicione um orfanato</span>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapPicker>
              <p>Selecione um ponto no mapa</p>
            </MapPicker>

            <Input
              name="name"
              title="Nome"
            />

            <TextArea
              title="Sobre"
              name="about"
            />
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <TextArea
              title="Instruções"
              name="instructions"
            />

            <Input
              title="Horário de funcionamento"
              name="opening_hours"
            />

            <ImagePicker name="images"/>

            <DecisionBox title="Atende fim de semana" name="open_on_weekends"/>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </Form>
      </main>
    </ManipulateOrphanageContainer>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
