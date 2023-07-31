import { ethers } from "ethers";

import { CHAIN_RPC } from "./constants.js";

const providers = {};

export default class Connector {
  static getProvider(chain) {
    if (!CHAIN_RPC[chain]) {
      throw new Error("Invalid chain while loading provider!!!");
    }
    if (providers[chain]) {
      return providers[chain];
    }
    providers[chain] = new ethers.providers.JsonRpcProvider(CHAIN_RPC[chain]);
    return providers[chain];
  }
}
