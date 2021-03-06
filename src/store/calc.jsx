import { makeAutoObservable } from 'mobx';

class Calc {
    constructor() {
        makeAutoObservable(this)
    }
    //STATE
    equation = '';
    lastOperator = '';
    lastValue = '0';
    outcome = '';

    // HELPERS 
    reset() {
        this.lastValue = '0';
        this.equation = '';
        this.lastOperator = '';
        this.outcome = '';
    }
    checkForDoubleOperator() {
        this.equation = this.equation.replace(/--/g, "+").replace(/\+-/g, "-");
    }
    removeDecimal() {
        if (this.lastValue.slice(-1) === '.') {
            this.lastValue = this.lastValue.slice(0, -1);
        }
    }
    shorten() {
        if (this.outcome.toString().match(/\./g)) {
            this.outcome = this.outcome.toFixed(2);
        }
    }
    // NUMBERS 
    addNumber(value) {
        if (this.outcome) {
            this.reset();
            this.lastValue = value;
            this.showStats()
            return
        }
        this.lastValue === "0" ? this.lastValue = value : this.lastValue = this.lastValue + value;
    }
    // OPERATORS
    addOperator(operator) {
        this.removeDecimal();
        if (this.outcome) {
            this.lastOperator = operator;
            this.equation = this.outcome + this.lastOperator;
            this.lastValue = ''
            this.outcome = '';
        }
        if (this.lastValue === '') {
            this.lastOperator = operator;
            this.equation = this.equation.slice(0, -1) + this.lastOperator;
        } else {
            this.lastOperator = operator;
            this.equation = this.equation + this.lastValue + this.lastOperator;
            this.lastValue = ''
        }
        this.checkForDoubleOperator();
    }
    erase() {
        if (!this.outcome) {
            // ничего не делаем в самом начале 
            if (!this.equation && this.lastValue === '0') {
                return
            }
            if (!this.equation && this.lastValue) {
                this.lastValue = '0';
                return
            }
            if (this.equation && this.lastValue) {
                this.lastValue = '';
                return
            }
            if (this.equation && !this.lastValue) {
                this.reset()
                return
            }
        } else {
            this.reset();
        }
    }
    calculate() {
        this.removeDecimal()
        if (!this.outcome) {
            // do nothing at the start 
            if (this.lastValue === '0' && this.equation === '') {
                console.log('stare')
                return;
            }
            // do nothing if you have only one argument 
            if (this.lastValue && !this.lastOperator) {
                console.log('no operator yet, second value yet')
                return;
            }
            //
            if (this.equation && !this.lastValue) {
                console.log('no second argument yet ')
                return
            }
            this.equation = this.equation + this.lastValue + '=';
            this.outcome = eval(this.equation.slice(0, -1));
            // this.equation = this.outcome + this.lastOperator;
            this.shorten();
        } else {
            if (this.lastOperator && this.lastValue) {
                this.equation = this.outcome + this.lastOperator + this.lastValue + '=';
                this.checkForDoubleOperator();
                this.outcome = eval(this.equation.slice(0, -1));
            } else {
                this.equation = this.outcome + '%' + "=";
                this.outcome = this.outcome / 100;
            }
            this.shorten();
        }
    }
    addMinusToLastValue() {
        this.checkForDoubleOperator();
        if (this.outcome) {
            if (parseInt(this.outcome) < 0) {
                this.outcome = this.outcome.toString().slice(1);
                return
            } else {
                this.outcome = "-" + this.outcome
                return
            }
        }
        if (this.lastValue === '0') {
            return
        }
        if (parseInt(this.lastValue) > 0) {
            this.lastValue = '-' + this.lastValue;
        } else {
            this.lastValue = this.lastValue.slice(1);
        }
    }

    addDecimal() {
        if (this.lastValue.match(/\./g)) {
            return
        } else if (this.lastValue === '') {
            this.lastValue = '0.'
        } else {
            this.lastValue = this.lastValue + '.';
        }
    }

    percent() {
        if (!this.outcome) {
            if (this.lastValue === "0" && !this.equation) {
                return
            }
            if (this.lastValue && !this.equation) {
                this.equation = this.lastValue + '%' + '=';
                this.outcome = eval(this.lastValue) / 100;
                this.lastOperator = ''
                this.shorten();
                return
            }
            //введен первый аргумент а второй еще нет 
            if (this.equation && !this.lastValue) {
                this.equation = this.equation.slice(0, -1) + '%' + '='
                this.outcome = eval(this.equation.slice(0, -2)) / 100;
                this.lastOperator = ''
                this.shorten();
                return
            }
            // есть два аргумента 
            if (this.lastValue && this.equation) {
                this.equation = this.equation + this.lastValue + '%' + "="
                this.outcome = eval(this.equation.slice(0, -2)) / 100;
                this.lastOperator = ''
                this.shorten();
                return
            }
        } else {
            this.equation = this.outcome.toString() + '%' + '=';
            this.outcome = this.outcome / 100;
            this.lastOperator = '';
            this.shorten();
        }
    }
}

export default new Calc();