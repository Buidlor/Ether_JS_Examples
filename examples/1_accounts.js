const { ethers } = require("ethers");
let secret = require("../secret.json");

//const MORALIS_ID = '12345'
const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/${secret.moralisNodeId}/eth/mainnet`) //declare RPC node provider

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const main = async () => {
    const balance = await provider.getBalance(address)
    const Balance = ethers.utils.formatEther(balance)  //readable format Balance
   
    console.log(`\nETH Balance of ${address} --> ${Balance} ETH\n`)
}

main()

