import { ethers } from "ethers";

export const formatNumberWithDecimals = (number, decimals) => {
  return Number(ethers.utils.formatUnits(number, decimals));
};
