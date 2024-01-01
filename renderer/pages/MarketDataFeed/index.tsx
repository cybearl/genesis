export default function MarketDataFeed() {

    return (
        <div className="w-full h-full">
            <h1>Market data feed</h1>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={
                    () => {
                        window.api.send("ping", "Hello from renderer");
                    }
                }
            >
                Test IPC communication
            </button>
        </div>
    );
}