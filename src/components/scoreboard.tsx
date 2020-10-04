import React, { Component } from 'react';
import Frame from './frame';
import './scoreboard.css'
import axios from 'axios';
import FrameDto from '../viewModel/frameDto';
import ThrowDto from '../viewModel/throwDto';

interface ScoreboardProps {

}

interface ScoreboardState {
    frames: Array<FrameDto>,
    submitSuccess?: boolean;
    pins?: string,
    score?: number,
    errorMessage?: string,
    
}

const houses: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Su'];

export default class Scoreboard extends Component<ScoreboardProps, ScoreboardState> {

    constructor(props: ScoreboardProps) {
        super(props);
        this.state = { frames: [] }
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ pins: e.target.value });
    }

    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const submitSuccess: boolean = await this.submitForm();
        this.setState({ submitSuccess });
    };

    private async submitForm(): Promise<boolean> {
        const pins = this.state.pins;
        axios.get(`http://localhost:8080/game?pins=${pins}`)
            .then(res => {
                let framesDto: Array<FrameDto> = this.mapToFramesDtos(res.data.frames);
                this.setState({
                    frames: framesDto,
                    score: res.data.score,
                });
            })
            .catch(err => {
                // console.log(err);
                this.setState({errorMessage: JSON.stringify(err.response.data)});
            });
        return true;
    }

    private async reset(): Promise<boolean> {
        axios.post(`http://localhost:8080/game`)
            .then(res => {
                this.setState({
                    frames: [],
                    score: 0,
                    errorMessage: ""
                });
            })
            .catch(err => {
                // console.log(err);
                
                //let errorObject=JSON.parse(JSON.stringify(err));
                const {response} = err;
                const {reqest, ...errorObject} = response;
                
                console.log(JSON.parse(errorObject));

                this.setState({errorMessage: 'null'});
            });
        return true;
    }

    private mapToFramesDtos(frames: any): Array<FrameDto> {
        let framesDtos: Array<FrameDto> = [];
        for (let frame of frames) {
            let firstThrowDto: ThrowDto = new ThrowDto(frame.firstThrow.pins);
            let secondThrowDto: ThrowDto | null;
            if (undefined !== frame.secondThrow) {
                secondThrowDto = new ThrowDto(frame.secondThrow.pins);
            }
            else {
                secondThrowDto = null;
            }
            let bonusThrowDto: ThrowDto | null;
            if (undefined !== frame.bonusThrow) {
                bonusThrowDto = new ThrowDto(frame.bonusThrow.pins);
            }
            else {
                bonusThrowDto = null;
            }
            let frameDto: FrameDto = new FrameDto(
                frame.score,
                firstThrowDto,
                secondThrowDto,
                bonusThrowDto,
                frame.isLastFrame,
                frame.isStrike,
                frame.isSpare);
            framesDtos.push(frameDto);
        }
        return framesDtos;
    }

    renderGame(houses: Array<string>, frames: Array<FrameDto>) {
        console.log(frames);
        return (
            houses.map((house, i) => (
                this.processFrame(house, i, frames)
            ))
        )
    }

    processFrame(house: string, i: number, frames: Array<FrameDto>) {
        if (frames.length > 0) {
            let frame = frames[i];
            if (frame !== undefined) {
                return (
                    <Frame key={i} house={house}
                        firstThrow={frame.firstThrow}
                        secondThrow={frame.secondThrow !== undefined ? frame.secondThrow : null}
                        bonusThrow={frame.bonusThrow !== undefined ? frame.bonusThrow : null}
                        score={frame.score !== undefined ? frame.score : null}
                        isLastFrame={frame.isLastFrame}
                        isStrike={frame.isStrike}
                        isSpare={frame.isSpare} />
                )
            }
            else {
                return (
                    <Frame key={i} house={house} isLastFrame={house === '10' ? true : false} isStrike={false} isSpare={false} />
                );
            }

        }
        else {
            return (
                <Frame key={i} house={house} isLastFrame={house === '10' ? true : false} isStrike={false} isSpare={false} />
            );
        }

    }

    render() {
        return (
            <div>
                <h1>SCOREBOARD</h1>
                <div>
                    {this.renderGame(houses, this.state.frames)}
                </div>
                <form className='.form' onSubmit={this.handleSubmit}>
                    <label className='.label'>
                        Pins stroken:
                    <input type="number" name="pins" min="0" max="10" onChange={(e) => this.handleChange(e)} />
                    </label>
                    <input type="submit" value="Post" />
                </form>
                <button onClick={() => this.reset()}>Reset</button>
                <div>{this.state.errorMessage}</div>
            </div>
        );
    }
}