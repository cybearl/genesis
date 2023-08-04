import "configs/env";

import Bot from "classes/bot";


const bot = new Bot(
    "MATIC/USDT",
    "R&D",
    true,
    20,
    "1m",
    4
);

bot.start();

setTimeout(async () => {
    await bot.stop();
}, 60000);


