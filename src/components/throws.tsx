import React, { Component } from 'react';
import './throws.css';

interface ThrowsProps {
    firstThrowPins?: number | null,
    secondThrowPins?: number | null,
    bonusThrowPins?: number | null,
    isLastFrame: boolean,
    isStrike: boolean,
    isSpare: boolean,
}

export default class Throws extends Component<ThrowsProps> {

    determinePrintedValueFirstThrow(pins: number | null, isStrike: boolean): string {
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

    determinePrintedValueSecondThrows(pins: number | null, isLastFrame: boolean, isStrike: boolean, isSpare: boolean): string {
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

    determinePrintedValueThirdThrows(pins: number | null, isLastFrame: boolean, isStrike: boolean, isSpare: boolean): string {
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

    render() {
        return (
            <div className='throws'>
                <div className='throw'>
                    {this.props.firstThrowPins !== undefined ? this.determinePrintedValueFirstThrow(this.props.firstThrowPins, this.props.isStrike) : ""}
                </div>
                <div className='throw'>
                    {this.props.secondThrowPins !== undefined ? this.determinePrintedValueSecondThrows(this.props.secondThrowPins, this.props.isLastFrame, this.props.isStrike, this.props.isSpare) : ""}
                </div>
                {this.props.isLastFrame && <div className='throw'>{this.props.bonusThrowPins !== undefined ? this.determinePrintedValueThirdThrows(this.props.bonusThrowPins, this.props.isLastFrame, this.props.isStrike, this.props.isSpare) : ""}</div>}
            </div>
        );
    }
}