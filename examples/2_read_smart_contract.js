const { ethers } = require("ethers");
let secret = require("../secret.json");
const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/${secret.moralisNodeId}/eth/mainnet`) //assign RPC provider

const ERC20_ABI = [                                                 //Array with functions from the smart contract (find those function isn etherscan)
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'        // DAI Contract
const FTTaddress ='0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9'      //FTT Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)  //assign acontract with the address, the functions and the rpc node  
const contract2 = new ethers.Contract(FTTaddress, ERC20_ABI, provider)

const main = async () => {
    const name = await contract.name()                          //name function in the contract(check abi)
    const symbol = await contract.symbol()                      //symbol function in the contract(check abi)
    const totalSupply = await contract.totalSupply()            //totalSupply function in the contract(check abi)
    const TotalSupply = ethers.utils.formatEther(totalSupply)   //ethersjs utility to convert Ether format  *10^18
    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}`)
    console.log(`Total Supply Formatted: ${TotalSupply}\n`)

    const balance = await contract.balanceOf('0x6c6Bc977E13Df9b0de53b251522280BB72383700') //balanceOf function with address argument in the contract(check abi)

    console.log(`Balance Returned: ${balance}`)
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
}

// tested a not arrow function
async function mainor() {
    const name = await contract2.name()
    const symbol = await contract2.symbol()
    const totalSupply = await contract2.totalSupply()
    const TotalSupply = ethers.utils.formatEther(totalSupply) 


    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}`)
    console.log(`Total Supply Formatted: ${TotalSupply}\n`)

    const balance = await contract.balanceOf('0x75d8ff2e50035587557eb53520eb52c09c4ba052')

    console.log(`Balance holder: ${balance}`)
    console.log(`Balance holder Formatted: ${ethers.utils.formatEther(balance)}\n`)
}
main()

mainor()

