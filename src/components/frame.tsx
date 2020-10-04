import Throws from './throws';
import React, { Component } from 'react';
import './frame.css';
import ThrowDto from '../viewModel/throwDto';

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

// interface FrameState {
//     firstThrow?: ThrowDto,
//     secondThrow?: ThrowDto | null,
//     house?: string,
// }

export default class Frame extends Component<FrameProps> {

    // constructor(props: FrameProps) {
    //     super(props);
    //     this.state = {
    //         house: props.house,
    //         firstThrow: props.firstThrow,
    //         secondThrow: props.secondThrow,
    //     }
    // }

    // componentDidUpdate(prevProps: FrameProps) {
    //     if (
    //         prevProps.firstThrow !== this.props.firstThrow ||
    //         prevProps.secondThrow !== this.props.secondThrow ||
    //         prevProps.house !== this.props.house
    //     ) {
    //         this.setState({
    //             house: this.props.house,
    //             firstThrow: this.props.firstThrow,
    //             secondThrow: this.props.secondThrow,
    //         });
    //     }
    // }

    render() {
        return (
            <div className="frame">
                <div className="house">{this.props.house}</div>
                <Throws
                    firstThrowPins={undefined !== this.props.firstThrow ? this.props.firstThrow.pins : null}
                    secondThrowPins={(undefined !== this.props.secondThrow && null !== this.props.secondThrow) ? this.props.secondThrow.pins : null}
                    bonusThrowPins={(undefined !== this.props.bonusThrow && null !== this.props.bonusThrow) ? this.props.bonusThrow.pins : null}
                    isLastFrame={this.props.isLastFrame}
                    isStrike={this.props.isStrike}
                    isSpare={this.props.isSpare} />
                <div className="score">{(undefined !== this.props.score && null !== this.props.score) ? this.props.score : null}</div>
            </div>
        )
    }
}