/* eslint-disable @typescript-eslint/no-unused-vars */

import "configs/env.config";

import Bot from "classes/bot";
import StrategyPool from "systems/SP";


const SP = new StrategyPool();

SP.run();