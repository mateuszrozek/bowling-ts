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

    function determinePrintedValueSecondThrows(pins: number | null, isLastFrame: boolean, isStrike: boolean, isSpare: boolean): string {
        let result: string;
        if (null !== pins) {
            if (isLastFrame) {
                if (isStrike) {
                    result = 'X';
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

    function determinePrintedValueThirdThrows(pins: number | null, isLastFrame: boolean, isStrike: boolean, isSpare: boolean): string {
        let result: string;
        if (null !== pins) {
            if (isSpare) {
                result = '/';
            } else if (isStrike) {
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

    return (
        <div className='throws'>
            <div className='throw'>
                {props.firstThrowPins !== undefined ? determinePrintedValueFirstThrow(props.firstThrowPins, props.isStrike) : ""}
            </div>
            <div className='throw'>
                {props.secondThrowPins !== undefined ? determinePrintedValueSecondThrows(props.secondThrowPins, props.isLastFrame, props.isStrike, props.isSpare) : ""}
            </div>
            {props.isLastFrame && <div className='throw'>{props.bonusThrowPins !== undefined ? determinePrintedValueThirdThrows(props.bonusThrowPins, props.isLastFrame, props.isStrike, props.isSpare) : ""}</div>}
        </div>
    );
}