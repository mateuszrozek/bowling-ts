import React, { useState } from 'react';
import { Frame } from './frame';
import './scoreboard.css'
import axios from 'axios';
import FrameDto from '../dto/frameDto';
import Mapper from '../utils/mapper';

export const Scoreboard = () => {

    const [frames, setFrames] = useState<Array<FrameDto>>([]);
    const [pins, setPins] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const houses: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const BASE_URL: string = `http://localhost:8080/game`;
    const GET_URL = BASE_URL + `?pins=${pins}`;
    const totalTitle = 'Total';
    const lastFrameTitle = '10';
    const EMPTY_STRING = "";
    const MAX_HOUSES = 10;
    const LAST_HOUSE_POSITION = 9;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPins(e.target.value);
        setErrorMessage(EMPTY_STRING);
    }

    async function submitForm() {
        await axios.get(GET_URL)
            .then(res => {
                let framesDto: Array<FrameDto> = Mapper.mapToFramesDtos(res.data.frames);
                setFrames(framesDto);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data);
            });
    }

    async function reset() {
        await axios.post(BASE_URL)
            .then(() => {
                setFrames([]);
                setErrorMessage(EMPTY_STRING);
            })
            .catch(err => console.log(err));
        return true;
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
                    <Frame key={i} house={house} isLastFrame={house === lastFrameTitle ? true : false} isStrike={false} isSpare={false} />
                );
            }

        }
        else {
            return (
                <Frame key={i} house={house} isLastFrame={house === lastFrameTitle ? true : false} isStrike={false} isSpare={false} />
            );
        }
    }

    function overallScore(frames: Array<FrameDto>): number | null {
        return (frames.length === MAX_HOUSES && frames[LAST_HOUSE_POSITION].isScoreKnown) ? frames[LAST_HOUSE_POSITION].score : null;
    }

    return (
        <div className="scoreboard">
            <h1>SCOREBOARD</h1>
            <div className="frames">
                {renderGame(houses, frames)}
                {<Frame key={12} house={totalTitle} isLastFrame={false} isStrike={false} isSpare={false} score={overallScore(frames)} />}
            </div>
            <div className="form">
                <label>Pins struck:</label>
                <input type="number" name="pins" min="0" max="10" defaultValue="0" onChange={(e) => handleChange(e)} />
                <button onClick={() => submitForm()}>Submit</button>
                <button onClick={() => reset()}>Reset</button>
            </div>
            {errorMessage === EMPTY_STRING ? null : <div className="error-message">{errorMessage}</div>}
        </div>
    );
}