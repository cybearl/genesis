export const generateHelpMsg = `
Usage (workspaces): yarn core:generate [options]
Usage (local): yarn generate [options]

Description
    Generate a JSON file containing market data for a specified trading pair.

    The file is named after the different parameters used to generate it
    which allows querying the data by the same parameters.

    This script is mostly used for the HSS system which uses static data to
    score the different strategies.

    The output path cannot be changed and is set to 'GENERAL_CONFIG.dataPath'.

Options
    --help              Display this message.
    --pair              The trading pair to generate the data for.
                        Defaults to 'BNB/USDT'.
    --timeframe         The timeframe to generate the data for.
                        Defaults to '1m'.
    --since             Timestamp to start generating the data from,
                        represented as the amount of days before the current time.
                        Defaults to 1.
    --entriesPerPage    The amount of entries per page.
                        Defaults & limited to 512.
`;

export const scoreHelpMsg = `
Usage (workspaces): yarn core:score [options]
Usage (local): yarn score [options]

Description
    Generate a score for a specific strategy or all strategies based on the
    historical data of a trading pair.

    The strategy and the trading pair can be chose via options, other parameters
    such as the timeframe can also be specified to choose data more precisely.

    As a reminder, the data should be generated via the 'generate' script.

Options
    --help              Display this message.
    --show              Show the available data for the HSS with a query.
    --pair              The trading pair to generate the data for.
                        Defaults to ALL.
    --timeframe         The timeframe to generate the data for.
                        Defaults to ALL.
    --since             Timestamp to start generating the data from,
                        represented as the amount of days before the current time.
                        Defaults to ALL.
`;