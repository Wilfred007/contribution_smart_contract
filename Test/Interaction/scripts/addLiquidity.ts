import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

// async function removeLiquidity() {
//     // The address of the smart contract we are interacting with
//     const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
//     const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
//     const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

//     // This is the address of the person we are trying to impersonate
//     const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";
//      // This is where we impersonate the token holder using 
//      const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

//     //Helpers gets the token holder's address 
//     await helpers.impersonateAccount(TOKEN_HOLDER);
//     const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
//     const DAI_Contract = await ethers.getContractAt("IERC20", DAI, impersonatedSigner);
//     const ROUTER = await ethers.getContractAt("IUniswapV2Router01", ROUTER_ADDRESS, impersonatedSigner);


//     const liquidity = 2;
//     const amountAMin = ethers.parseUnits('5',6);
//     const amountBMin = ethers.parseUnits('5',18);

//     const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
//     const daiBal = await DAI_Contract.balanceOf(impersonatedSigner.address);
//     const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
//     console.log("=========================================================");

//     console.log("usdc balance before removing liquidity", Number(usdcBal));
//     console.log("dai balance before  removing liquidity", Number(daiBal));    
//     console.log("=========================================================");

//     await ROUTER.removeLiquidity(
//         USDC,
//         DAI,
//         liquidity,
//         amountAMin,
//         amountBMin,
//         impersonatedSigner.address,
//         deadline
//     )

//     const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
//     const daiBalAfter = await DAI_Contract.balanceOf(impersonatedSigner.address);


//     console.log("usdc balance after removing liquidity", Number(usdcBalAfter));
//     console.log("dai balance after removing liquidity", Number(daiBalAfter));
    
// }

async function main() {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

    const amountADesired = ethers.parseUnits("10", 6);
    const amountBDesired = ethers.parseUnits("15", 18);
    const amountAMin = ethers.parseUnits('0',6);
    const amountBMin = ethers.parseUnits('0',18);


    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const DAI_Contract = await ethers.getContractAt("IERC20", DAI, impersonatedSigner);
    
    const ROUTER = await ethers.getContractAt("IUniswapV2Router01", ROUTER_ADDRESS, impersonatedSigner);

    await USDC_Contract.approve(ROUTER, amountADesired);
    await DAI_Contract.approve(ROUTER, amountBDesired);

    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const daiBal = await DAI_Contract.balanceOf(impersonatedSigner.address);
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    console.log("usdc balance before adding liquidity", Number(usdcBal));
    console.log("dai balance before adding liquidity", Number(daiBal));

    const tx = await ROUTER.addLiquidity(
        USDC,
        DAI,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        impersonatedSigner.address,
        deadline
    );

    const receipt = await tx.wait();
    console.log(receipt);
    
// console.log('LP tokens received:', (receipt as any)?.events[0].args.liquidity.toString());

    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const daiBalAfter = await DAI_Contract.balanceOf(impersonatedSigner.address);

    console.log("=========================================================");

    console.log("usdc balance after adding liquidity ", Number(usdcBalAfter));
    console.log("dai balance after adding liquidity", Number(daiBalAfter));

    // removeLiquidity();
}




main();