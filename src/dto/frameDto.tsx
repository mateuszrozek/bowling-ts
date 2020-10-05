
import ThrowDto from './throwDto';

export default class FrameDto{

    score: number;
    firstThrow: ThrowDto;
    secondThrow: ThrowDto | null;
    bonusThrow: ThrowDto | null;
    isLastFrame: boolean;
    isStrike: boolean;
    isSpare: boolean;
    isScoreKnown: boolean;

    constructor(score: number, firstThrow: ThrowDto, secondThrow: ThrowDto | null, bonusThrow: ThrowDto | null, isLastFrame: boolean, isStrike: boolean, isSpare: boolean, isScoreKnown: boolean){
        this.score = score;
        this.firstThrow = firstThrow;
        this.secondThrow = secondThrow;
        this.bonusThrow = bonusThrow;
        this.isLastFrame = isLastFrame;
        this.isStrike = isStrike;
        this.isSpare = isSpare;
        this.isScoreKnown = isScoreKnown;
    }
}
