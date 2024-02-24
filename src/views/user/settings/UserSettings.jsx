import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import MarketplaceAbi from "../../../../blockchain/frontend/contractsData/Marketplace.json";
import MarketplaceAddress from "../../../../blockchain/frontend/contractsData/Marketplace-address.json";
//import NFTAbi from "../../../../blockchain/frontend/contractsData/NFT.json";
//import NFTAddress from "../../../../blockchain/frontend/contractsData/NFT-address.json";
import { ethers } from "ethers";

import IMG_USER_PROFILE from "@assets/profile_pic.png";

export default function UserSettings() {
    const location = useLocation();

    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [marketplace, setMarketplace] = useState({})
    const [AccountType, setAccountType] = useState(false)


    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        setMarketplace(marketplace)
        const user = await marketplace.users(account)
        setAccountType(user.user_name != null ? true : false)
    }

    const web3Handler = async () => {
        if (!window.ethereum) {
            alert('Install metamask extention');
            return;
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        // Get provider from Metamask
        /*const provider = new ethers.providers.JsonRpcProvider(RpcHttpUrl)*/
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()
        const balance = await provider.getBalance(accounts[0])
        const balances = ethers.utils.formatEther(balance);
        setBalance(balances)
        loadContracts(signer)
    };


    const logout = () => {
        setAccount('')
        setAccountType(false);
        localStorage.removeItem('account');
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({
                    method: 'wallet_requestPermissions',
                    params: [
                        {
                            eth_accounts: {},
                        },
                    ],
                })
                .then((permissions) => {
                    if (permissions && permissions.find((perm) => perm.parentCapability === 'eth_accounts' && perm.caveats.length === 0)) {
                        // User approved account disconnection
                        window.ethereum._metamask.disconnect();
                    } else {
                        // User denied account disconnection
                        console.log('Logout canceled');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // MetaMask is not installed
            alert('MetaMask is not installed');
        }
    }

    const secureaccount = async () => {

        await (await marketplace.create_User(account, "Arnab Das", "134556", "raj713335@gmail.com", "+91 9547966499", "Male", "20-06-1997", "CGDPD1480N")).wait();
        setAccountType(true);
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            })

            window.ethereum.on('accountsChanged', async function (accounts) {
                setAccount(accounts[0])
                await web3Handler()
            });
        }
    });

    useEffect(() => {
        if (!!localStorage.getItem('account')) {
            (async () => {
                const account = localStorage.getItem('account');
                setAccount(account)
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner();
                const balance = await provider.getBalance(account);
                const balances = ethers.utils.formatEther(balance);
                setBalance(balances)
                const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
                setMarketplace(marketplace)
                const user = await marketplace.users(account)
                setAccountType(user.user_name ? true : false)
                console.log(user.user_name, user.user_id, user.email, user.phone_number, user.gender, user.dob, user.pancard)
                console.log(AccountType)
            })();
        }
    }, []);

    useEffect(() => {
        if (!!account) {
            localStorage.setItem('account', account);
        }
    }, [account]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="my-10 flex gap-8">
          <div className="w-2/6 pr-4 border-r">
            <div className="sticky top-20">
              <div className="flex gap-2">
                <div className="w-2/6">
                  <img
                    className="w-28 h-28"
                    src={IMG_USER_PROFILE}
                    alt="user-profile-img"
                  />
                </div>
                <div className="w-4/6">
                  <h1 className="font-bold text-xl">Sayan Sinha</h1>
                  <div className="mt-1 text-sm flex justify-between text-gray-700 bg-gradient-to-r from-yellow-50 via-white to-yellow-50">
                    <p className="text-xs text-yellow-600">
                      <i className="fa-solid fa-check-circle fa-fw"></i> Your
                      subscription is active
                    </p>
                    </div>
                    {account && 
                    <p className="mt-4 text-lg text-gray-600 font-bold">
                        <i className="fa-brands fa-ethereum fa-fw"></i> {balance} ETH
                      </p>
                    }
                </div>
              </div>
             {account &&
              <><hr className="mt-8 mb-2 border-gray-100" /><p className="text-sm font-medium text-green-600">
                                  <i className="fa-solid fa-check-circle fa-fw"></i> Wallet
                                  connected
                              </p><div className="flex items-center justify-between gap-2">
                                      <p className="text-xs text-gray-500 break-all">
                                      {account}
                                      </p>
                                      <button className="w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full">
                                          <i className="fa-solid fa-copy fa-fw"></i>
                                      </button>
                                  </div></>}

                          <hr className="my-2 border-gray-100" />
                          {account &&
                          <p className="text-sm font-medium text-green-600">
                          <i className="fa-solid fa-lock fa-fw"></i> Account secured
                          </p>}

                          {!account &&
                           <p className="text-sm font-medium text-red-600">
                           <i className="fa-solid fa-lock fa-fw"></i> Account  Not secured
                           </p>}
                                  <p className="mt-1 text-sm text-gray-500">
                                      Secured via blockchain
                                  </p>

              <hr className="my-4 border-gray-100" />

              <div className="my-4 flex items-center justify-between">
                <div>
                  <h2 className="text-md font-semibold">Connect wallet</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect your ethereum wallet
                  </p>
                              </div>
                              {account ? (<><button className="nav-btn btn btn-secondary btn-sm btn-block"><a href={`https://goerli.etherscan.io/address/${account}`} target="_blank"
                                  rel="noopener noreferrer" > {account.slice(0, 5) + '...' + account.slice(38, 42)}</a></button>
                                  <button
                                      className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-red-200 border border-gray-200 hover:text-gray-700 rounded-md"
                                      onClick={logout}
                                  >
                                      Disconnect Wallet
                                  </button></>) : (
                                      <button
                                          className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-green-200 border border-gray-200 hover:text-gray-700 rounded-md"
                                          onClick={web3Handler}
                                      >
                                          Connect
                                      </button>)}
                {/*<button*/}
                {/*  className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md"*/}
                {/*  onClick={web3Handler}*/}
                {/*>*/}
                {/*  Connect*/}
                {/*</button>*/}
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="my-4 flex items-center justify-between">
                <div>
                  <h2 className="text-md font-semibold">Secure account</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Secure your account via blockchain
                  </p>
                </div>
                {!AccountType &&
                    <button className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md" onClick={secureaccount}>
                        Secure account
                    </button>
                }
                {AccountType &&
                    <button className="py-2.5 px-4 text-sm font-semibold bg-green-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md" onClick={secureaccount} disabled>
                        Secured
                    </button>
                }
              </div>
            </div>
          </div>
          <div className="w-4/6">
            <div className="sticky top-[56px] bg-white shadow-sm border-b border-gray-200">
              <nav className="-mb-px flex gap-2" aria-label="Tabs">
                <Link
                  to="/settings/profile"
                  className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    location.pathname === "/settings/profile"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Profile details
                </Link>
                <Link
                  className={`px-2 py-2 shrink-0 border-b-2 text-sm font-medium duration-200 ${
                    location.pathname === "/settings/tab-2"
                      ? "text-sky-600 border-sky-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Payment & Subscriptions
                </Link>
              </nav>
            </div>
            <div className="my-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
