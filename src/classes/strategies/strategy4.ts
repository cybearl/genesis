/* eslint-disable @typescript-eslint/no-unused-vars */
import { Strategy } from "classes/strategies";
import NsStrategy from "types/strategy";
import logger from "utils/logger";


/**
 * Strategy 4 implementation (CRYPTOcurrencies Trading Strategy).
 * @link https://www.youtube.com/watch?v=xy4gpC4rCZ8
 */
export default class Strategy4__CRYPTOCURRENCIES extends Strategy {
    /**
     * Main function to run the strategy.
     * @param pricesBars The prices bars to run the strategy on.
     * @returns The profits array.
     */
    run(pricesBars: Array<NsStrategy.priceBar>): Array<number> {
        let slAnchor = 0;
        let buyPrice = 0;

        for (const priceBar of pricesBars) {
            if (!this._inPosition) {
                //if (priceBar.signal == true) {
                //TODO: je sais pas si c'est pertinent j'ai l'impression que ça l'empêche limite de fonctionner CF : video (1:50 -> 7:06)
                slAnchor = priceBar.close;
                buyPrice = priceBar.close;
                this.buyTimestamps.push(priceBar.timestamp);
                this.buyPrices.push(buyPrice);
                this._inPosition = true;
                //}
            } else {
                if (priceBar.close > slAnchor) {
                    slAnchor = priceBar.close;
                } else if (priceBar.close < slAnchor * 0.97 || priceBar.close > buyPrice * 1.01) {
                    this.sellTimestamps.push(priceBar.timestamp);
                    this.sellPrices.push(priceBar.close);
                    this._inPosition = false;
                }
            }
        }
        for (let i = 0; i < this.buyPrices.length - 1; i++) {
            this._profits.push(this.sellPrices[i] - this.buyPrices[i]);
        }

        return this._profits;
    }
}