import React from 'react';
import './throws.css';

interface ThrowsProps {
    firstThrowPins?: number | null,
    secondThrowPins?: number | null,
    bonusThrowPins?: number | null,
    isLastFrame: boolean,
    isStrike: boolean,
    isSpare: boolean,
}

const STRIKE_SIGN = 'X';
const SPARE_SIGN = '/';
const STRIKE_NUMBER = 10;
const EMPTY_STRING = "";
export const Throws = (props: ThrowsProps) => {

    function determinePrintedValueFirstThrow(pins: number | null, isStrike: boolean): string {
        let result: string;
        if (null !== pins) {
            if (isStrike) {
                result = STRIKE_SIGN;
            } else {
                result = pins.toString();
            }
        }
        else {
            result = "";
        }
        return result;
    }

    function determinePrintedValueSecondThrow(pins: number | null, isLastFrame: boolean, isStrike: boolean, isSpare: boolean): string {
        let result: string;
        if (null !== pins) {
            if (isLastFrame) {
                if (isStrike) {
                    if (STRIKE_NUMBER === pins) {
                        result = STRIKE_SIGN;
                    }
                    else {
                        result = pins.toString();
                    }
                } else if (isSpare) {
                    result = SPARE_SIGN;
                } else {
                    result = pins.toString();
                }
            }
            else {
                if (isSpare) {
                    result = SPARE_SIGN;
                } else {
                    result = pins.toString();
                }
            }
        }
        else {
            result = EMPTY_STRING;
        }
        return result;
    }

    function determinePrintedValueThirdThrow(firstThrow: number | null, secondThrow: number | null, bonusThrow: number | null): string {
        let result: string;
        if (null !== firstThrow && null !== secondThrow && null !== bonusThrow) {
            if (firstThrow === STRIKE_NUMBER) {
                if (bonusThrow === STRIKE_NUMBER) {
                    result = STRIKE_SIGN;
                } else if (secondThrow + bonusThrow === STRIKE_NUMBER) {
                    result = SPARE_SIGN;
                }
                else {
                    result = bonusThrow.toString();
                }
            }
            else if (firstThrow !== STRIKE_NUMBER && firstThrow + secondThrow === STRIKE_NUMBER) {
                result = bonusThrow.toString();
            } else if (secondThrow !== STRIKE_NUMBER && secondThrow + bonusThrow === STRIKE_NUMBER) {
                result = SPARE_SIGN;
            } else {
                result = bonusThrow.toString();
            }
        }
        else result = EMPTY_STRING;
        return result;
    }

    return (
        <div className='throws'>
            <div className='throw'>
                {props.firstThrowPins !== undefined ? determinePrintedValueFirstThrow(props.firstThrowPins, props.isStrike) : EMPTY_STRING}
            </div>
            <div className='throw'>
                {props.secondThrowPins !== undefined ? determinePrintedValueSecondThrow(props.secondThrowPins, props.isLastFrame, props.isStrike, props.isSpare) : EMPTY_STRING}
            </div>
            {props.isLastFrame &&
                <div className='throw'>
                    {props.firstThrowPins !== undefined && props.secondThrowPins !== undefined && props.bonusThrowPins !== undefined
                        ? determinePrintedValueThirdThrow(props.firstThrowPins, props.secondThrowPins, props.bonusThrowPins)
                        : EMPTY_STRING}
                </div>}
        </div>
    );
}