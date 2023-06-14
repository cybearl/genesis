/* eslint-disable @typescript-eslint/no-unused-vars */
import NsStrategy from "types/strategy";


/**
 * Default class for strategy implementation.
 */
export default class Strategy {
    protected percentage = 0;

    protected _inPosition = false;
    protected _inPositionArray = [false, false];

    protected _profits: Array<number> = [];

    protected buyTimestamps: Array<number> = [];
    protected buyPrices: Array<number> = [];

    protected sellTimestamps: Array<number> = [];
    protected sellPrices: Array<number> = [];


    /**
     * Main function to run the strategy.
     * @param pricesBars The prices bars to run the strategy on.
     * @returns The profits array.
     */
    run(pricesBars: Array<NsStrategy.priceBar>): Array<number> {
        return this._profits;
    }
}