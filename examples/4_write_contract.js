const { ethers } = require("ethers");
let secret = require("../secret.json");

const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/${secret.moralisNodeId}/eth/rinkeby`)

const account1 = '0x710B1b594d1b6677A811EE320C92B33babfbD308'       // Your account address 1
const account2 = '0x0735133D9442af16c96909F4EdDE88e77C56A620'       // Your account address 2

const privateKey1 = secret.privateKey // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)             //assign privatekey and provider to build a wallet

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'        //contract of LINK Token
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)             //connect build wallet to the contract Link

    const tx = await contractWithWallet.transfer(account2, balance) //(use the connected wallet) use the transfer function of link contract and assign to a const 
    await tx.wait()                                                  //wait for the transaction

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()