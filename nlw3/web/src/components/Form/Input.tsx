import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { InputContainer } from './styles';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    title: string;
    name: string;
}

const Input:React.FC<InputProps> = ({title, name, ...rest}) => {
    const {fieldName, registerField, defaultValue, error, clearError} = useField(name);
    const inputRef = useRef(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <InputContainer htmlFor={name}>
            <span>{title}</span>
            <input 
                ref={inputRef}
                {...rest}
                defaultValue={defaultValue}
                onKeyPress={clearError}
            />
            {error && <span className='error'>{error}</span>}
        </InputContainer>
    );
}

export default Input;