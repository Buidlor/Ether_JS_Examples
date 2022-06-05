const { ethers } = require("ethers");
let secret = require("../secret.json");


const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/${secret.moralisNodeId}/eth/mainnet`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"   //Transfer event
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const block = await provider.getBlockNumber()  //get the current blocknumber (see etherscan)

    const transferEvents = await contract.queryFilter('Transfer', block - 10, block)  // filter events from contract DAI from current block - 10 to current block.
    console.log(transferEvents)
}

main()