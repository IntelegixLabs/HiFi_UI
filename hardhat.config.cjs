require("@nomiclabs/hardhat-waffle");

const INFURA_URL = '';
const PRIVATE_KEY = '';
const COINBASE_URL = 'https://goerli.ethereum.coinbasecloud.net';

module.exports = {
    solidity: "0.8.4",
    networks: {
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org",
            accounts: {
                mnemonic: "",
                path: "m/44'/52752'/0'/0"
            },
            chainId: 44787
        },
        celo: {
            url: "https://forno.celo.org",
            accounts: {
                mnemonic: "",
                path: "m/44'/52752'/0'/0"
            },
            chainId: 42220
        }
    },
    paths: {
        artifacts: "./blockchain/backend/artifacts",
        sources: "./blockchain/backend/contracts",
        cache: "./blockchain/backend/cache",
        tests: "./blockchain/backend/test"
    },
};