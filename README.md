<p align="center">
    <a href="https://github.com/cybearl/genesis" target="_blank">
        <img src="https://raw.githubusercontent.com/cybearl/genesis/main/assets/logo.png" width="350" alt="Genesis logo">
    </a>
</p>

<p align="center">
    <a href="https://github.com/yoratoni" target="_blank">
        <img src="https://img.shields.io/badge/made%20by-Yoratoni-858FF0?style=flat-square">
    </a>
    <a href="https://github.com/cybearl/genesis/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/cybearl/genesis?color=D962F2&style=flat-square">
    </a>
    <a href="https://github.com/cybearl/genesis/issues" target="_blank">
        <img src="https://img.shields.io/github/issues-raw/cybearl/genesis?color=FF8D70&style=flat-square">
    </a>
    <a href="https://github.com/cybearl/genesis/blob/main/package.json" target="_blank">
        <img src="https://img.shields.io/github/package-json/v/cybearl/genesis?color=FDD384&style=flat-square">
    </a>
</p>

### WORK IN PROGRESS..

Installation
------------
Note that this bot is currently in development, we're not really checking if a new version is compatible
with the previous one, and bugs are to be expected.

Note that to make this bot work locally, you need to have Python installed on your machine with
an environment variable for it.

We're using Binance to get precise market data and EthersJS to make trades on the Ethereum blockchain.

Technical Summary
-----------------
The principle of the bot is based on a governance system with multiple trading strategies.
Each strategy is a set of rules that are applied to the market
to determine if a trade should be made or not.

This governance system (Strategy pool or SP) works with a scoring system. The score for each strategy is based
on the performance of the strategy on historical data.
The best strategies are then selected to be used in the live market.
Now, for each strategy to cohabit with the others, a weight is assigned to it based on its score.
The higher the score, the higher the weight, and the more the strategy choice will be taken into account.

All of this system is secured by a risk management system (RMS) that will prevent the bot from
making trades at lost if strategies are not performing well for some reason. This system acts
as a fallback to prevent the bot from losing money in the worst case scenario.

Systems Schematic
-----------------
```
BOT
|
|-> Generator System (generator)
|   |
|   |-> Historical Scoring System (HSS)
|       |
|       |-> Gives a score for each strategy (called a pipe which a JSON result file)
|           |
|           |-> Accessible by Strategy Pool (SP)
|
|-> General Loop
|   |
|   |-> Measures time diff between local and server time
|   |-> Updates the values of the bot in the database
|
|-> Main Loop
    |
    |-> Risk Management System (RMS)
        |
        |-> Profit Calculator
        |-> Stop Loss
        |
        |-> Strategy Pool (SP) (HSS Weighted Governance)
            |
            |-> Strategy (S)
            |-> Strategy (S)
            |-> ...
```

Systems
-------
More details about the systems used by the bot.

#### Generator System (GS):
This system is used to generate the data needed by the HSS to calculate the score of a strategy.
It generates a JSON file containing the data of the market for each candle over a period of time.

The command to run the generator is `yarn generate` and it supports the following arguments (all optional):
- `--pair` The trading pair to generate the data for.
- `--timeframe` The timeframe to generate the data for.
- `--since` Timestamp to start generating the data from,
    represented as the amount of days before the current time (> 0).
- `--entriesPerPage` The amount of entries per page (0 < entriesPerPage <= 512).

`--help` can be used to display the help message.

The default path for the generated data is `src/pipes/data/` & cannot be changed.

Can be found inside `src/systems/GS.ts`.

#### Historical Scoring System (HSS):
This system is used to calculate the score of a strategy based on its performance on historical data.

It generates a JSON file containing a result for each strategy, the result contains the score of the strategy
and other useful data.

The command to run the HSS is `yarn score` and it supports the following arguments (all optional):
- `--show` can be used to display the available data for scoring.
- `WORK IN PROGRESS..`

- `--help` can be used to display the help message.

From a filter on the available data, such as the trading pair, the timeframe, etc.
the HSS will generate a score for each strategy, generating or reusing the `score` JSON file.

These result file is called 'score', they are used by the SP to weight the strategies.
Its default path is `src/pipes/score.json`.

Can be found inside `src/systems/HSS.ts`.

#### Note about GS & HSS:
The generated data for tests and strategy scores are stored in a directory called `pipes`
as they are used to pipe the scoring system with the strategies themselves.

#### Risk Management System (RMS):
This fallback system used to prevent the SP from making stupid trades works on two basic systems:
- The profit calculator: This system is used to calculate the profit including fees of a trade,
  ensuring that only profitable trades are made by the SP.
- The stop loss: This system is used to prevent the bot from losing money if the SP is not performing well,
  meaning that the RMS is the only system that can, in fact, make the bot lose money.

Can be found inside `src/systems/RMS.ts`.

#### Strategy Pool (SP):
This system contains all the strategies used to decide whether a trade should be made or not.
It is using the scoring system to weight the strategies, creating a basic governance system.

It is also used to control each strategy by sending it the data it needs to work and
receiving the data it produces.

Can be found inside `src/systems/SP.ts`.

#### Strategy (S):
This is the basic system of the bot, it is used to decide whether a trade should be made or not.
The bot implements multiple strategies, each one is a set of rules that are applied to the market.

Notes:
- The strategy name should be in the format `strategy_<name>.ts`.
- The strategy should be implemented inside `src/classes/strategies/`.
- The strategy should be extended from the `Strategy` class (see `src/classes/strategies/strategy.ts`).
- The strategy should be imported & exported inside `src/classes/strategies/index.ts`.

Communication System
--------------------
For the bot to communicate with the client, two systems are used:
- The database: Contains all the data of the bot, including the logs and how it is performing, etc.
  It is used by the client to display the data to the user.
- The API: This system is used to allow the client to control the bot and send commands to it.
