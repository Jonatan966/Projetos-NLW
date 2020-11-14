import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { InputContainer } from './styles';

interface InputProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    title: string;
    name: string;
}

const TextArea:React.FC<InputProps> = ({title, name, ...rest}) => {
    const {fieldName, registerField, defaultValue, error, clearError} = useField(name);
    const textAreaRefs = useRef(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textAreaRefs.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <InputContainer htmlFor={name}>
            <span>{title}</span>
            <textarea 
                ref={textAreaRefs}
                {...rest}
                defaultValue={defaultValue}
                onKeyPress={clearError}
            />
            {error && <span className='error'>{error}</span>}
        </InputContainer>
    );
}

export default TextArea;