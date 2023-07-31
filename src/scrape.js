import { appendFileSync, existsSync, unlinkSync, writeFileSync } from "fs";

import AVALANCHE_ABI from "./abi/avalanche.js";
import Connector from "./connector.js";
import { pools } from "./constants.js";
import { formatNumberWithDecimals } from "./utils.js";

import { ethers } from "ethers";

const getLiquidity = async (pool) => {
  const filePath = `./src/data/${pool.name}.csv`;
  if (existsSync(filePath)) {
    unlinkSync(filePath);
    writeFileSync(filePath, "Block Number, Date, Time, Liquidity \n");
  }
  const provider = await Connector.getProvider(pool.chain);
  const poolContract = new ethers.Contract(
    pool.address,
    AVALANCHE_ABI,
    provider
  );
  const eventFilters = [
    poolContract.filters.AddLiquidity(),
    poolContract.filters.RemoveLiquidity(),
    poolContract.filters.RemoveLiquidityOne(),
    poolContract.filters.RemoveLiquidityImbalance(),
  ];
  const filters = {
    address: "",
    topics: [[]],
  };
  eventFilters.forEach((item) => {
    filters.address = item.address;
    filters.topics[0].push(...item.topics);
  });
  const currentBlockNumber = await provider.getBlockNumber();
  const { blockNumber } = await provider.getTransactionReceipt(
    pool.creationHash
  );

  for (let ctr = blockNumber; ctr <= currentBlockNumber; ctr += 49000) {
    console.log("Scanning from block:", ctr);
    const events = await poolContract.queryFilter(
      filters,
      ctr,
      ctr + 49000 > currentBlockNumber ? currentBlockNumber : ctr + 49000
    );
    if (events.length > 0) {
      for (let event of events) {
        const block = await event.getBlock();
        const iface = new ethers.utils.Interface(AVALANCHE_ABI);
        const decodedData = iface.parseLog({
          data: event.data,
          topics: event.topics,
        });
        const date = new Date(block.timestamp * 1000);
        appendFileSync(
          filePath,
          `${blockNumber},${date.toLocaleDateString()},${(
            "0" + date.getHours()
          ).slice(-2)}:${("0" + date.getMinutes()).slice(
            -2
          )},${formatNumberWithDecimals(decodedData.args.token_supply, 18)} \n`
        );
      }
    }
  }
};

getLiquidity(pools[0]);
