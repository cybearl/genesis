import { Strategy } from "classes/strategies";
import NsStrategy from "types/strategy";


/**
 * Strategy 1 implementation (Intraday Trading Strategy).
 * @link https://www.youtube.com/watch?v=XA5EI0rmYeA
 */
export default class Strategy1__INTRADAY extends Strategy {
    /**
     * Main function to run the strategy.
     * @param pricesBars The prices bars to run the strategy on.
     * @returns The profits array.
     */
    run(pricesBars: Array<NsStrategy.priceBar>): Array<number> {
        let buyPrice = 0;

        for (const priceBar of pricesBars) {
            priceBar.pctChange = priceBar.close / priceBar.open - 1;
            this.percentage = 0.002;

            let boughtAt = 0;
            let tp = 0;
            let sl = 0;

            let index = 1;

            if (!this._inPosition) {
                if (priceBar.pctChange > this.percentage / 2) {
                    buyPrice = priceBar.close; // Close
                    boughtAt = index;

                    tp = buyPrice * (1 + this.percentage);
                    sl = buyPrice * (1 - this.percentage);

                    this._inPosition = true;
                }
            } else if (index > boughtAt) {
                // High
                if (priceBar.high > tp) {
                    this._profits.push(priceBar.close - buyPrice);
                    this._inPosition = false;
                // Low
                } else if (priceBar.low < sl) {
                    this._profits.push(priceBar.close - buyPrice);
                    this._inPosition = false;
                // Reset position
                } else {
                    this._inPosition = false;
                }
            }

            index++;
        }

        return this._profits;
    }
}