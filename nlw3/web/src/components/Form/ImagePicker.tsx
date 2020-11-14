import { useField } from '@unform/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ImagePickerContainer, InputContainer } from './styles';

const ImagePicker: React.FC<{name: string, disabled?: boolean}> = ({name, disabled = false}) => {
    const {fieldName, registerField, defaultValue, error, clearError} = useField(name);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);  

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
          return;
        }
        
        clearError();

        const selectedImages = Array.from(event.target.files);
    
        setImages(images.concat(selectedImages));
        
        const selectedImagesPreview = selectedImages.map(image => {
          return URL.createObjectURL(image);
        });
    
        setPreviewImages(selectedImagesPreview);
    }
    
    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: {obj: images},
            path: 'obj'
        });
    },[fieldName, registerField, images]);

    useEffect(() => {
        if (defaultValue instanceof Array) {
            defaultValue.forEach((img: {id: number, url: string}) => {
                setPreviewImages([...previewImages, img.url]);
            });    
        }
    }, [defaultValue]);

    return (
        <InputContainer>
            <span>Fotos</span>

            <ImagePickerContainer>
                {previewImages.map(image => {
                    return (
                    <img key={image} src={image} alt={name}/>
                    );
                })}

                {!disabled &&
                    <label htmlFor={`${name}[]`} className="new-image">
                        <FiPlus size={24} color="#15b6d6" />
                    </label>          
                }
            </ImagePickerContainer>
            <input 
                multiple 
                type="file" 
                id={`${name}[]`}
                onChange={handleSelectImages}
                disabled={disabled}
            />
            {error && <span className='error'>{error}</span>}
      </InputContainer>
);
}

export default ImagePicker;