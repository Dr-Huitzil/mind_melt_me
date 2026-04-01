import { useReducer, useCallback } from "react";

const initialState = {
    input: '',
    result: ''
};

//mathermatically processes string natively to guarantee zero unsafe evals
const safeMathEval = (expression) => {
    // standardize operators
    const sanitizedInput = expression.replace(/×/g, '*').replace(/÷/g, '/');
    if (/[^0-9+\-*/().\s]/.test(sanitizedInput)) throw new Error('Invalid characters in expression');

    // tokenize string keeping nummbers and symbols
    let tokens = sanitizedInput.match(/(\d+\.?\d*|\.\d+|[+\-*/()])/g);
    if (!tokens) throw new Error('Invalid expression');

    // handle initial negative numbers
    if (tokens[0] === '-' && tokens.length > 1) {
        tokens[1] = '-' + tokens[1];
        tokens.shift();
    }

    // mathematical priority: multiplication/division first, then addition/subtraction
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const left = parseFloat(tokens[i - 1]);
            const right = parseFloat(tokens[i + 1]);
            if (isNaN(left) || isNaN(right)) throw new Error('Syntax error');

            const res = tokens[i] === '*' ? left * right : left / right;
            tokens.splice(i - 1, 3, String(res));
            i--; // adjust index after modification
        }
    }

    // mathematical priority: addition/subtraction
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '+' || tokens[i] === '-') {
            const left = parseFloat(tokens[i - 1]);
            const right = parseFloat(tokens[i + 1]);
            if (isNaN(left) || isNaN(right)) throw new Error('Syntax error');

            const res = tokens[i] === '+' ? left + right : left - right;
            tokens.splice(i - 1, 3, String(res));
            i--; // adjust index after modification
        }

    }

    if (tokens.length !== 1 || isNaN(parseFloat(tokens[0]))) {
        throw new Error("Compute Failure");
    }

    return String(tokens[0]);
};

function calculatorReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case 'EVALUATE':
            if (!state.input) return state;
            try {
                //strictly evaluate the tokens safely
                const evaluated = safeMathEval(state.input);
                return { ...state, result: evaluated };
            } catch (error) {
                console.warn("Calculator Execution Syntax Warning:", error.message);
                return { ...state, result: 'Error' };
            }
        case 'CLEAR':
            return { input: '', result: '' };
        case 'DELETE':
            return { ...state, input: state.input.slice(0, -1) };
        case 'APPEND':
            // when building euqations after getting a result, optionally reset
            if (state.result && !isNaN(payload) && payload !== '.') {
                return { input: String(payload), result: '' };
            }
            return { input: state.input + String(payload), result: '' };
        default:
            return state;

    }
}

export const useCalculator = () => {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    const handleButtonClick = useCallback((value) => {
        if (value === '=') {
            dispatch({ type: 'EVALUATE' });
        } else if (value === 'C') {
            dispatch({ type: 'CLEAR' });
        } else if (value === 'DEL') {
            dispatch({ type: 'DELETE' });
        } else {
            dispatch({ type: 'APPEND', payload: value });
        }
    }, []);

    return { input: state.input, result: state.result, handleButtonClick };
};