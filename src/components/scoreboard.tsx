import React, { useState } from 'react';
import { Frame } from './frame';
import './scoreboard.css'
import axios from 'axios';
import FrameDto from '../viewModel/frameDto';
import ThrowDto from '../viewModel/throwDto';

// interface ScoreboardProps {

// }

// interface ScoreboardState {
//     frames: Array<FrameDto>,
//     submitSuccess?: boolean;
//     pins?: string,
//     score?: number,
//     errorMessage: string,
// }

const houses: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const Scoreboard = () => {

    const [frames, setFrames] = useState<Array<FrameDto>>([]);
    const [pins, setPins] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPins(e.target.value);
        setErrorMessage("");
    }

    async function submitForm() {
        await axios.get(`http://localhost:8080/game?pins=${pins}`)
            .then(res => {
                let framesDto: Array<FrameDto> = mapToFramesDtos(res.data.frames);
                setFrames(framesDto);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data);
            });
    }

    async function reset() {
        await axios.post(`http://localhost:8080/game`)
            .then(() => {
                setFrames([]);
                setErrorMessage("");
            })
            .catch(err => console.log(err));
        return true;
    }

    function mapToFramesDtos(frames: any): Array<FrameDto> {
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
                frame.isSpare,
                frame.isScoreKnown);
            framesDtos.push(frameDto);
        }
        return framesDtos;
    }

    function renderGame(houses: Array<string>, frames: Array<FrameDto>) {
        return (
            houses.map((house, i) => (
                processFrame(house, i, frames)
            ))
        )
    }

    function processFrame(house: string, i: number, frames: Array<FrameDto>) {
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

    function overallScore(frames: Array<FrameDto>): number | null {
        return (frames.length == 10 && frames[9].isScoreKnown) ? frames[9].score : null;
    }

    return (
        <div className="scoreboard">
            <h1>SCOREBOARD</h1>
            <div className="frames">
                {renderGame(houses, frames)}
                {<Frame key={12} house={'Total'} isLastFrame={false} isStrike={false} isSpare={false} score={overallScore(frames)} />}
            </div>
            <div className="form">
                <label>Pins struck:</label>
                <input type="number" name="pins" min="0" max="10" onChange={(e) => handleChange(e)} />
                <button onClick={() => submitForm()}>Submit</button>
                <button onClick={() => reset()}>Reset</button>
            </div>
            {errorMessage === "" ? null : <div className="error-message">{errorMessage}</div>}
        </div>
    );
}