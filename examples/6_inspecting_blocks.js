const { ethers } = require("ethers");
let secret = require("../secret.json");


const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/${secret.moralisNodeId}/eth/mainnet`)

const main = async () => {
    const block = await provider.getBlockNumber() //get current block number.

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()