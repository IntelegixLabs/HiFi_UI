import { Fragment, useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import MarketplaceAbi from "../../../../blockchain/frontend/contractsData/Marketplace.json";
import MarketplaceAddress from "../../../../blockchain/frontend/contractsData/Marketplace-address.json";
//import NFTAbi from "../../../../blockchain/frontend/contractsData/NFT.json";
//import NFTAddress from "../../../../blockchain/frontend/contractsData/NFT-address.json";
import { ethers } from "ethers";

import IMG_USER_PROFILE from "@assets/profile_pic.png";

export default function UserSettings() {
  const location = useLocation();

  const [web3Account, setWeb3Account] = useState(null);
  const [balance, setWeb3Balance] = useState(null);
  const [marketplace, setMarketplace] = useState({});
  const [web3AccountType, setWeb3AccountType] = useState(false);

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const user = await marketplace.users(web3Account);
    setWeb3AccountType(user.user_name != null ? true : false);
  };

  const web3Connect = async () => {
    if (!window.ethereum) {
      alert("Install metamask extension");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWeb3Account(accounts[0]);
    // Get provider from Metamask
    /*const provider = new ethers.providers.JsonRpcProvider(RpcHttpUrl)*/
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();
    const balance = await provider.getBalance(accounts[0]);
    const balances = ethers.utils.formatEther(balance);
    setWeb3Balance(balances);
    loadContracts(signer);
  };

  const disconnectWallet = () => {
    setWeb3Account("");
    setWeb3AccountType(false);
    localStorage.removeItem("web3Account");
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then((permissions) => {
          if (
            permissions &&
            permissions.find(
              (perm) =>
                perm.parentCapability === "eth_accounts" &&
                perm.caveats.length === 0
            )
          ) {
            // User approved account disconnection
            window.ethereum._metamask.disconnect();
          } else {
            // User denied account disconnection
            console.log("Wallet not disconnected!");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // MetaMask is not installed
      alert("MetaMask is not installed");
    }
  };

  const secureWeb3Account = async () => {
    await (
      await marketplace.create_User(
        web3Account,
        "Arnab Das",
        "134556",
        "raj713335@gmail.com",
        "+91 9547966499",
        "Male",
        "20-06-1997",
        "CGDPD1480N"
      )
    ).wait();
    setWeb3AccountType(true);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", async function (accounts) {
        setWeb3Account(accounts[0]);
        await web3Connect();
      });
    }
  });

  useEffect(() => {
    if (!!localStorage.getItem("web3Account")) {
      (async () => {
        const web3Account = localStorage.getItem("web3Account");
        setWeb3Account(web3Account);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balance = await provider.getBalance(web3Account);
        const balances = ethers.utils.formatEther(balance);
        setWeb3Balance(balances);
        const marketplace = new ethers.Contract(
          MarketplaceAddress.address,
          MarketplaceAbi.abi,
          signer
        );
        setMarketplace(marketplace);
        const user = await marketplace.users(web3Account);
        setWeb3AccountType(user.user_name ? true : false);
        console.log(
          user.user_name,
          user.user_id,
          user.email,
          user.phone_number,
          user.gender,
          user.dob,
          user.pancard
        );
        console.log(web3AccountType);
      })();
    }
  }, []);

  useEffect(() => {
    if (!!web3Account) {
      localStorage.setItem("web3Account", web3Account);
    }
  }, [web3Account]);

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
                  {web3Account && (
                    <p className="mt-4 text-lg text-gray-600 font-bold">
                      <i className="fa-brands fa-ethereum fa-fw"></i> {balance}
                      ETH
                    </p>
                  )}
                </div>
              </div>

              <hr className="mt-8 mb-2 border-gray-100" />

              {web3Account ? (
                <Fragment>
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium text-green-600">
                      <i className="fa-solid fa-check-circle fa-fw"></i> Wallet
                      connected
                    </p>
                    <button
                      className="font-semibold text-xs text-red-400 hover:text-red-600"
                      onClick={disconnectWallet}
                    >
                      <i className="fa-solid fa-times fa-fw"></i> disconnect
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      className="text-xs text-gray-500 hover:text-gray-700 underline hover:no-underline break-all"
                      href={`https://goerli.etherscan.io/address/${web3Account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {web3Account}
                    </a>
                    <button className="w-8 h-8 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full">
                      <i className="fa-solid fa-copy fa-fw"></i>
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="my-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-md font-semibold">Connect wallet</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Connect your ethereum wallet
                      </p>
                    </div>
                    <button
                      className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md"
                      onClick={web3Connect}
                    >
                      Connect
                    </button>
                  </div>
                </Fragment>
              )}

              <hr className="my-2 border-gray-100" />

              {web3AccountType ? (
                <Fragment>
                  <p className="text-sm font-medium text-green-600">
                    <i className="fa-solid fa-lock fa-fw"></i> Account secured
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Secured via blockchain
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="my-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-md font-semibold">Secure account</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Secure your account via blockchain
                      </p>
                    </div>
                    <button
                      className="py-2.5 px-4 text-sm font-semibold bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:text-gray-700 rounded-md"
                      onClick={secureWeb3Account}
                    >
                      Secure account
                    </button>
                  </div>
                </Fragment>
              )}
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
