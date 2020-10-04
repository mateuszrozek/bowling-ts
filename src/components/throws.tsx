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

export const Throws = (props: ThrowsProps) => {

    function determinePrintedValueFirstThrow(pins: number | null, isStrike: boolean): string {
        let result: string;
        if (null !== pins) {
            if (isStrike) {
                result = 'X';
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
                    if ('10' === pins.toString()) {
                        result = 'X';
                    }
                    else {
                        result = pins.toString();
                    }
                } else if (isSpare) {
                    result = '/';
                } else {
                    result = pins.toString();
                }
            }
            else {
                if (isSpare) {
                    result = '/';
                } else {
                    result = pins.toString();
                }
            }
        }
        else {
            result = "";
        }
        return result;
    }

    function determinePrintedValueThirdThrow(firstThrow: number | null, secondThrow: number | null, bonusThrow: number | null): string {
        let result: string;
        if (null !== firstThrow && null !== secondThrow && null !== bonusThrow) {
            if (firstThrow === 10) {
                if (bonusThrow === 10) {
                    result = 'X';
                } else if (secondThrow + bonusThrow === 10) {
                    result = '/';
                }
                else {
                    result = bonusThrow.toString();
                }
            }
            else if(firstThrow !== 10 && firstThrow + secondThrow === 10){
                result = bonusThrow.toString();
            } else if(secondThrow !== 10 && secondThrow + bonusThrow === 10){
                result = '/';
            } else {
                result = bonusThrow.toString();
            }
        }
        else result = "";
        return result;
    }

    return (
        <div className='throws'>
            <div className='throw'>
                {props.firstThrowPins !== undefined ? determinePrintedValueFirstThrow(props.firstThrowPins, props.isStrike) : ""}
            </div>
            <div className='throw'>
                {props.secondThrowPins !== undefined ? determinePrintedValueSecondThrow(props.secondThrowPins, props.isLastFrame, props.isStrike, props.isSpare) : ""}
            </div>
            {props.isLastFrame && <div className='throw'>{props.firstThrowPins !== undefined && props.secondThrowPins !== undefined && props.bonusThrowPins !== undefined ? determinePrintedValueThirdThrow(props.firstThrowPins, props.secondThrowPins, props.bonusThrowPins) : ""}</div>}
        </div>
    );
}