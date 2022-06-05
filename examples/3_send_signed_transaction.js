const { ethers } = require("ethers");
let secret = require("../secret.json");

const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/${secret.rinkebyNodeId}/eth/rinkeby`) //assign RPC provider.

const account1 = '0x710B1b594d1b6677A811EE320C92B33babfbD308' // Your account address 1. Sender
const account2 = '0x0735133D9442af16c96909F4EdDE88e77C56A620' // Your account address 2. Receiver

const privateKey1 = secret.privateKey       // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider) //wallet requires private key and provider

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({  //send transaction requires wallet (to and value)
        to: account2,
        value: ethers.utils.parseEther("0.025") //utility for transforming to wei   *10^-18
    })

    await tx.wait() //wait for the transaction to finish before going to next line
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()