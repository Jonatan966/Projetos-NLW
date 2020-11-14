import * as Yup from 'yup';

export async function validadeOrphanage(data: any, formRef: React.MutableRefObject<any>, includeImg = true) {
    try {
        let imgSchema = {images: Yup.array().min(1, 'Selecione pelo menos 1 imagem')} as any;

        if (!includeImg) {
            imgSchema = {};
        }

        const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        latitude: Yup.number().notOneOf([0], 'Um ponto deve ser selecionado'),
        longitude: Yup.number().notOneOf([0], 'Um ponto deve ser selecionado'),
        about: Yup.string().min(25, 'Deve ter pelo menos 25 caracteres').required('Campo obrigatório'),
        instructions: Yup.string().min(15, 'Deve ter pelo menos 25 caracteres').required('Campo obrigatório'),
        opening_hours: Yup.string().min(15, 'Deve ter pelo menos 15 caracteres').required('Campo obrigatório'),
        ...imgSchema
      });
      
      await schema.validate(data, {
        abortEarly: false
      });

      return true;
    }

    catch (err){
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {} as any;

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);

        return false;
      }
    }
}