import React from "react";
import WindowFrame from './WindowFrame';
import { useCalculator } from '../../hooks/useCalculator';
import '../../styles/windows/CalculatorWindow.css';

const CalculatorWindow = ({ onClose, onMinimize, zIndex, onFocus, minimized }) => {
    const { input, result, handleButtonClick } = useCalculator();

    return (
        <WindowFrame
            title="Calculator"
            minimized={minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            zIndex={zIndex}
            onFocus={onFocus}
            defaultSize={{ width: 300, height: 550 }}
            minConstraints={[330, 550]}
            isResizable={false}
        >
            <div className="calculator-container">

                {/* LCD Display */}
                <div className="calculator-lcd">
                    <div className="calculator-lcd-input">
                        {input || ' '}
                    </div>
                    <div className="calculator-lcd-result">
                        {result || (input ? ' ' : '0')}
                    </div>
                </div>

                {/*mock brand*/}
                <div className="calculator-brand-container">
                    <span className="calculator-brand-text">
                        Mind Melt
                    </span>
                </div>


                {/* Keypad */}
                <div className="calculator-keypad">
                    <button onClick={() => handleButtonClick('7')} className="calc-btn">7</button>
                    <button onClick={() => handleButtonClick('8')} className="calc-btn">8</button>
                    <button onClick={() => handleButtonClick('9')} className="calc-btn">9</button>
                    <button onClick={() => handleButtonClick('DEL')} className="calc-btn">DEL</button>
                    <button onClick={() => handleButtonClick('C')} className="calc-btn">CA</button>

                    <button onClick={() => handleButtonClick('4')} className="calc-btn">4</button>
                    <button onClick={() => handleButtonClick('5')} className="calc-btn">5</button>
                    <button onClick={() => handleButtonClick('6')} className="calc-btn">6</button>
                    <button onClick={() => handleButtonClick('×')} className="calc-btn">×</button>
                    <button onClick={() => handleButtonClick('÷')} className="calc-btn">÷</button>

                    <button onClick={() => handleButtonClick('1')} className="calc-btn">1</button>
                    <button onClick={() => handleButtonClick('2')} className="calc-btn">2</button>
                    <button onClick={() => handleButtonClick('3')} className="calc-btn">3</button>
                    <button onClick={() => handleButtonClick('+')} className="calc-btn">+</button>
                    <button onClick={() => handleButtonClick('-')} className="calc-btn">-</button>

                    <button onClick={() => handleButtonClick('0')} className="calc-btn">0</button>
                    <button onClick={() => handleButtonClick('.')} className="calc-btn">.</button>
                    <button onClick={() => handleButtonClick('00')} className="calc-btn calc-btn-00">00</button>
                    <button onClick={() => handleButtonClick('=')} className="calc-btn calc-btn-equals">
                        =
                    </button>
                </div>
            </div>
        </WindowFrame>
    );
};

export default CalculatorWindow;