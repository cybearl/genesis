import "configs/env.config";

import Bot from "classes/bot";


const bot = new Bot(
    "MATIC/USDT",       // Trading pair
    "R&D",              // Bot name
    false,              // Sandbox mode
    20,                 // Initial quote balance
    "1s",               // Timeframe
    8,                  // OHLCV limit
);

bot.start();

setTimeout(async () => {
    await bot.stop();
}, 60000);


