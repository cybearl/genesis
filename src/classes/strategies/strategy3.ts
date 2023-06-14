/* eslint-disable @typescript-eslint/no-unused-vars */
import { Strategy } from "classes/strategies";
import NsStrategy from "types/strategy";
import logger from "utils/logger";


/**
 * Strategy 3 implementation (Fibonacci Trading Strategy).
 * @link https://www.youtube.com/watch?v=MzIE-u2_a7A
 */
export default class Strategy3__FIBONACCI extends Strategy {
    /**
     * Get the levels for the strategy.
     * @param timestamp The timestamp to get the levels for.
     * @param priceBars The price bars to get the levels from.
     * @returns The levels array.
     */
    getLevels(timestamp: number, priceBars: Array<NsStrategy.priceBar>): Array<number> {
        this.percentage = 0.618;

        const _values = [
            0 - this.percentage,
            this.percentage,
            1 + this.percentage
        ];

        let series_: NsStrategy.priceBar;
        let diff: number;
        let levels: Array<number>;

        for (const priceBar of priceBars) {
            if (priceBar.timestamp === timestamp) {
                series_ = priceBar;
                diff = series_.high - series_.low;

                levels = [
                    _values[0] * diff + series_.close,
                    _values[1] * diff + series_.close,
                    _values[2] * diff + series_.close
                ];

                return levels;
            }
        }

        return [0, 0, 0];
    }

    /**
     * Main function to run the strategy.
     * @param pricesBars The prices bars to run the strategy on.
     * @returns The profits array.
     */
    run(pricesBars: Array<NsStrategy.priceBar>): Array<number> {
        let buyPrice = 0;

        for (const priceBar of pricesBars) {
            const [sl, entry, tp] = this.getLevels(priceBar.timestamp, pricesBars);

            if (!this._inPosition && priceBar.close >= entry) {
                logger.info(`Buy at ${priceBar.close}`);

                buyPrice = priceBar.close;
                this._inPosition = true;
            } else if (this._inPosition) {
                if (priceBar.close <= sl || priceBar.close >= tp) {
                    logger.info(`Sell at ${priceBar.close}`);

                    this._profits.push(priceBar.close - buyPrice);
                    this._inPosition = false;
                }
            }
        }

        return this._profits;
    }
}