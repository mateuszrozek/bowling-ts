import FrameDto from '../dto/frameDto';
import ThrowDto from '../dto/throwDto';

export default class Mapper{
    static mapToFramesDtos(frames: any): Array<FrameDto> {
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

}