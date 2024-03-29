<p align="center">
    <a href="https://github.com/cybearl/genesis" target="_blank">
        <img src="https://raw.githubusercontent.com/cybearl/genesis/main/assets/logo.png" alt="Genesis logo" width="650px">
    </a>
</p>

<p align="center">
    <a href="https://github.com/cybearl/genesis/blob/main/package.json" target="_blank">
        <img src="https://img.shields.io/github/package-json/v/cybearl/genesis?color=FDD384&style=flat-square">
    </a>
    <a href="https://github.com/yoratoni" target="_blank">
        <img src="https://img.shields.io/badge/made%20by-Yoratoni-858FF0?style=flat-square">
    </a>
    <a href="https://github.com/cybearl/genesis/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/cybearl/genesis?color=D962F2&style=flat-square">
    </a>
    <a href="https://github.com/cybearl/genesis/issues" target="_blank">
        <img src="https://img.shields.io/github/issues-raw/cybearl/genesis?color=FF8D70&style=flat-square">
    </a>
</p>

## Update: 12/2023
I've decided to switch to Electron for the bot itself, I started this bot with a too complex architecture,
and I want it to be more user-friendly, and as it is fully open-source, I don't see any reason to bind it
to a web interface, so I'm switching to Electron, which will allow me to make a better UI and UX.

Work in progress..
------------------
This bot is still in development, so multiple features will be added once we know
it is working properly, a bit like a MVP.

First, we're using Binance Spot for the tradings, which needs to be later changed to
an external wallet. Basically, a wallet will be generated at the creation of a bot instance,
showing the address and the private key, the user will then have to send the funds,
and configure the bot to use a certain amount of funds, secure a percentage of the funds on
a personal wallet, etc.

Binance will still be used to get the market data, probably backed by another service,
but the tradings will be made from the external wallet. Pasting a Binance account API key
in a bot is generally not safe and I wouldn't do that too lol.

The strategies system needs to implement more methods to allow the strategies to be more complex,
including deep learning, better decision making, etc.

Installation
------------
Note that this bot is currently in development, we're not really checking if a new version is compatible
with the previous one, and bugs are to be expected.

`WORK IN PROGRESS..`

Technical Summary
-----------------
The principle of the bot is based on a governance system with multiple trading strategies.
Each strategy is a set of rules that are applied to the market
to determine if a trade should be made or not.

This governance system (Strategy pool or SP) works with a scoring system. The score for each strategy is based
on the performance of the strategy on historical data.
The best strategies are then selected to be used in the live market.
Now, for each strategy to cohabit with the others, a weight is assigned to it, based on its score.
The higher the score, the higher the weight, and the more the strategy choice will be taken into account.

All of this system is secured by a risk management system (RMS) that will prevent the bot from
making trades at lost if strategies are not performing well for some reason. This system acts
as a fallback to prevent the bot from losing money in the worst case scenario.

Systems Schematic
-----------------
It would take too much time to explain the link of each system with the others, so here is a schematic that
shows the link between the systems.

```
GENESIS
|
|-> Scoring & Governance System (Pipelines linking to the SP)
|   |
|   |-> Generator System (generator)
|   |   |
|   |   |-> Generates data for the Historical Scoring System (HSS -> data pipe)
|   |
|   |-> Historical Scoring System (HSS)
|       |
|       |-> Gives a score for a strategy (JSON result -> score pipe)
|
|-> General Loop
|   |
|   |-> Measures time diff between local and server time
|   |-> Updates the values of the bot in the database (statistics, etc.)
|
|-> Main Loop + Cache (market data)
    |
    |-> Strategy Pool (SP) (HSS Governance & strategy storage)
        |
        |-> Strategy (S)
        |-> Strategy (S)
        |-> ...
        |
        |-> Risk Management System (RMS)
            |
            |-> Profit Calculator
            |-> Stop Loss
            |
            |-> FINAL DECISION TO TRADE OR NOT
```

Systems
-------
More details about the systems used by the bot.

### Generator System (GS):
This system is used to generate the data needed by the HSS to calculate the score of a strategy.
It generates a JSON file containing the data of the market for each candle over a period of time.

The command to run the generator is `yarn generate` and it supports the following arguments (all optional):
- `--help` can be used to display the help message.
- `--tradingPair` The trading pair to generate the data for.
- `--timeframe` The timeframe to generate the data for.
- `--duration` The duration of the data to generate, represented as a timeframe,
  such as 30s, 1m, 1h, 4d, etc.
- `--entriesPerPage` The amount of entries per page (0 < entriesPerPage <= 512).

The default path for the generated data is `src/pipes/data/`. Note that it cannot be changed
via arguments, as data are later accessed by the HSS.

Can be found inside `src/systems/GS.ts`.

### Historical Scoring System (HSS):
This system is used to calculate the score of a strategy based on its performance on historical data.

The command to run the HSS is `yarn score` and it supports the following arguments (all optional):
- `--help` can be used to display the help message.
- `--show` displays the data currently available with the filters applied.
- `--showAll` can be used to display the available data for scoring.
- `--tradingPair` The trading pair to generate the data for.
- `--base` The base currency to generate the data for.
- `--quote` The quote currency to generate the data for.
- `--timeframe` The timeframe to generate the data for.
- `--minDuration` The minimum duration of the data to use, represented as a timeframe,
  such as 30s, 1m, 1h, 4d, etc.

The HSS will generate, under `src/pipes/scores`, a folder for each strategy (named by the strategy name), containing a `score.json`
file for the latest score, and a `reports` subdirectory containing the reports for each run (named by date)
containing graphics and data for analysis.

Can be found inside `src/systems/HSS.ts`.

### Note about GS & HSS:
The generated data for tests and strategy scores are stored in a directory called `pipes`
as they are used to pipe the scoring system with the strategies themselves.

### Risk Management System (RMS):
This fallback system used to prevent the SP from making unwanted trades (governance reduces that risk but it's never 100% safe, no matter what tech is used) works on two basic systems:
- The profit calculator: This system is used to calculate the profit including the fees of each trade,
  ensuring that only profitable trades are made by the SP.
- The stop loss: This system is used to prevent the bot from losing money if the SP is not performing well,
  meaning that the RMS is the only system that can, in fact, make the bot lose money.
- As said at the beginning of this README, better systems will be later implemented, depending on how the first version of the bot performs on the market.

The RMS works inside the Strategy Pool (SP) system, it wraps the trading part of the code, acting as a middleware between the trading decision and the actual trade. We recently changed the way it works in the schematic, it was, previously, acting like a middleware between the bot and the SP, we found it more logical to make it a part of the SP itself, as it is the one making the decision, easier to stop there than returning the data everywhere.

Can be found inside `src/systems/RMS.ts`.

### Strategy Pool (SP):
This system contains all the strategies used to decide whether a trade should be made or not.
It is using the scoring system to weight the strategies, creating a basic governance system.

It is also used to control each strategy by sending it the data it needs to work and
receiving the data it produces.

Now, I'm using a sweet trick to import and use the strategies automatically,
importing all strategies as a single object, iterating over it, recovering the
run() function for each and storing it. Remember that a strategy is standardized,
so we always know what to expect from it.

Can be found inside `src/systems/SP.ts`.

### Strategy (S):
This is the basic system of the bot, it is used to decide whether a trade should be made or not.
The bot implements multiple strategies, each one is a set of rules that are applied to the market.

Notes:
- The strategy name should be in the format `<unique_name>.ts`.
- The strategy should be implemented inside `src/classes/strategies/`.

Communication System
--------------------
For the bot to communicate with the client, two systems are used:
- The database: Contains all the data of the bot, including the logs and how it is performing, etc.
  It is used by the client to display the data to the user.
- The API: This system is used to allow the client to control the bot and send commands to it.
