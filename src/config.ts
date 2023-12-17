import fs from "fs";
import path from "path";
import "dotenv/config";

// auth API token
// https://app.streamingfast.io/
// https://app.pinax.network/
if (!process.env.SUBSTREAMS_API_TOKEN) {
    throw new Error("SUBSTREAMS_API_TOKEN is require");
}

export const token = process.env.SUBSTREAMS_API_TOKEN;
export const baseUrl = "https://eos.substreams.pinax.network:443";

// User parameters
export const manifest = "https://github.com/pinax-network/substreams/releases/download/common-v0.6.0/common-v0.6.0.spkg";
export const outputModule = "map_transaction_traces";
export const params = `map_action_traces=contract=eosio.evm&action=pushtx`;
export const startBlockNum = Number(process.env.START_BLOCK ?? "345801951") // 345827395;
// export const stopBlockNum = startBlockNum + 1;

// EOS EVM
export const LOCK_GENESIS_TIME = new Date("2023-04-05T02:18:09Z");

// EORC
export const TICKERS = (process.env.TICKERS ?? "eoss").split(",")

export const FOLDER = process.env.FOLDER ?? "data"
export const CURSOR_PATH = path.join(FOLDER, process.env.CURSOR_FILENAME ?? "cursor.lock");
export const EORC20_PATH = path.join(FOLDER, process.env.EORC20_FILENAME ?? "eorc20.jsonl");
export const BLOCKS_PATH = path.join(FOLDER, process.env.BLOCKS_FILENAME ?? "blocks.jsonl");

// create data folder
if ( !fs.existsSync(FOLDER)) {
    fs.mkdirSync(FOLDER);
}

// Stream Blocks
export const writers = {
    eorc20: fs.createWriteStream(EORC20_PATH, {flags: "a"}),
    blocks: fs.createWriteStream(BLOCKS_PATH, {flags: "a"}),
    // pushtx: fs.createWriteStream("data/pushtx.jsonl", {flags: "a"}),
}

export const VERBOSE = true;
export const PAUSED = process.env.PAUSED === "true";
export const HTTP_ONLY = process.env.HTTP_ONLY === "true";
export const PORT = Number(process.env.PORT ?? "3000");