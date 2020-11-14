import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { DecisionBoxContainer, InputContainer } from './styles';

export const DecisionBox: React.FC<{title: string, name: string, disabled?: boolean}> = ({title, name, disabled = false}) => {
    const {fieldName, registerField, defaultValue} = useField(name);
    const [checked, setChecked] = useState(false);
    const checkBox = useRef(document.createElement('input'));

    useEffect(() => {
        setChecked(checkBox.current.checked);

        registerField({
            name: fieldName,
            ref: checkBox.current,
            path: 'checked'
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        setChecked(defaultValue);
    }, [defaultValue]);

    function handleSwitchDecision(value: boolean) {
        if (!disabled) {
            setChecked(checkBox.current.checked = value);
        }
    }

    return (
        <InputContainer>
            <input 
                type="checkbox" 
                name={name} 
                ref={checkBox}
                style={{display: 'none'}}
                defaultChecked={defaultValue}
            />

            <span>{title}</span>

            <DecisionBoxContainer>
                <button 
                    className={checked ? 'active' : ''}
                    onClick={() => handleSwitchDecision(true)} 
                    type="button"
                    disabled={disabled}
                >
                    Sim
                </button>

                <button 
                    className={!checked ? 'active' : ''}
                    onClick={() => handleSwitchDecision(false)} 
                    type="button"
                    disabled={disabled}
                >
                    Não
                </button>
            </DecisionBoxContainer>
        </InputContainer>
    )
}