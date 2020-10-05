import { Throws } from './throws';
import React from 'react';
import './frame.css';
import ThrowDto from '../dto/throwDto';

interface FrameProps {
    firstThrow?: ThrowDto,
    secondThrow?: ThrowDto | null,
    bonusThrow?: ThrowDto | null,
    house: string,
    key: number,
    score?: number | null,
    isLastFrame: boolean,
    isStrike: boolean,
    isSpare: boolean
}

export const Frame = (props: FrameProps) => {

    return (
        <div className="frame">
            <div className="house">{props.house}</div>
            <Throws
                firstThrowPins={undefined !== props.firstThrow ? props.firstThrow.pins : null}
                secondThrowPins={(undefined !== props.secondThrow && null !== props.secondThrow) ? props.secondThrow.pins : null}
                bonusThrowPins={(undefined !== props.bonusThrow && null !== props.bonusThrow) ? props.bonusThrow.pins : null}
                isLastFrame={props.isLastFrame}
                isStrike={props.isStrike}
                isSpare={props.isSpare} />
            <div className="score">{(undefined !== props.score && null !== props.score) ? props.score : null}</div>
        </div>
    )
}