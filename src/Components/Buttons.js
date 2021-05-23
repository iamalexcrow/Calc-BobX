import React from 'react';
import styled, {css} from 'styled-components';
// import Button from './Button';
import {observer} from 'mobx-react-lite';
import Calc from '../store/calc';

const data = ['AC',"+/-", '%', `&#247;` , '7','8','9', `&times;` ,'4','5','6','-','1','2','3','+','.','0','=']

const Buttons = observer(() => {
    return (
        <ButtonsWrapper>
            {/* {data.map((b)=> {
                return (
                    <Button key={b}><p>{b}</p></Button>
                )
            })} */}
            <Button onClick={()=>Calc.erase()}>{Calc.outcome !== '' ? Calc.lastValue === '0' || !Calc.lastValue ? 'AC' : 'C' : 'AC'}</Button>
            <Button onClick={()=>Calc.addMinusToLastValue()}>+/-</Button>
            <Button onClick={()=>Calc.percent()}>%</Button>
            <Button onClick={()=>Calc.addOperator("/")}>&#247;</Button>
            <Button onClick={()=>Calc.addNumber('7')}>7</Button>
            <Button onClick={()=>Calc.addNumber('8')}>8</Button>
            <Button onClick={()=>Calc.addNumber('9')}>9</Button>
            <Button onClick={()=>Calc.addOperator("*")}>&times;</Button>
            <Button onClick={()=>Calc.addNumber('4')}>4</Button>
            <Button onClick={()=>Calc.addNumber('5')}>5</Button>
            <Button onClick={()=>Calc.addNumber('6')}>6</Button>

            <Button onClick={()=>Calc.addOperator("-")}>-</Button>

            <Button onClick={()=>Calc.addNumber('1')}>1</Button>
            <Button onClick={()=>Calc.addNumber('2')}>2</Button>
            <Button onClick={()=>Calc.addNumber('3')}>3</Button>
            <Button onClick={()=>Calc.addOperator("+")}>+</Button>
            <Button onClick={()=>Calc.addDecimal()}>.</Button>
            <Button onClick={()=>Calc.addNumber('0')}>0</Button>
            <Button wide={true} onClick={()=>Calc.calculate()}>=</Button>
        </ButtonsWrapper>
    )
})

export default Buttons;

const ButtonsWrapper = styled.div`
background: white;
display: grid;
grid-gap: 1px;
width: 230px;
grid-template-columns: 55px 57px 57px 58px;
grid-template-rows: repeat(5, 47px);
`

const Button = styled.button`
    box-sizing: border-box;
    outline:none;
    border:none;
    background: rgba(191,246,234,0.8);
    cursor: pointer;
    color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center; 
    box-sizing: border-box;
    ${props => props.wide && css`
        grid-row: 5/6;
        grid-column: 3/5;
        grid-span: 2;
  `}
  :active {
    background-color:rgba(191,246,234,1);
}
`