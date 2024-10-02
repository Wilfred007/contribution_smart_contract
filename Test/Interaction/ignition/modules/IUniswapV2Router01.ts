import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const IUniswapV2Router01 = buildModule("IUniswapV2Router01", (m) => {
 

  const IUniswapV2Router01 = m.contract("IUniswapV2Router01");

  return { IUniswapV2Router01 };
});

export default IUniswapV2Router01;
