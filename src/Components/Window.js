import React from 'react';
import styled from 'styled-components';
import Calc from '../store/calc';
import {observer} from 'mobx-react-lite';

const Window = observer(() => {
    return (
        <WindowWrapper>
            <EquationWindow>{Calc.equation}</EquationWindow>
            <InputWindow>{Calc.outcome !== '' ? Calc.outcome :Calc.lastValue}</InputWindow>
        </WindowWrapper>
    )
})

export default Window;

const EquationWindow = styled.p`
font-size: 20px;
display: flex;
justify-content: flex-end;
align-items: center;
margin: 0;
padding:0 8px;
`

const InputWindow = styled.p`
display: flex;
justify-content: flex-end;
align-items: center;
font-size: 35px;
margin: 0;
padding:0 8px;
`

const WindowWrapper = styled.div`
display: grid;
grid-template-rows: 40% 60%;
text-align: right;
width:230px;
height: 80px;
background: black;
color: white;
overflow-y: auto;`