# Trug - One Stop File Storage
![wide](https://user-images.githubusercontent.com/70228821/202831150-a4cc2a21-8e37-4505-a02a-57366dea2711.png)

Since the inception of Web3, we have achieved numerous milestones. One of these accomplishments is IPFS-based decentralised storage. Although IPFS is fantastic, the disadvantage emerges when users must utilise it on a daily basis. IPFS is based on a content-based addressing mechanism, which returns a lengthy string when files are uploaded to IPFS. This string changes whenever the file's content on IPFS is updated. This isn't practical for daily use because keeping track of the CIDs is a time-consuming task.

## And there comes Trug !

A decentralized file storage platform which functions quite similar to Google Drive with static URLs and enhanced Web3 features. On Trug, you can set up access controls which as facilitated by contracts deployed on the Wallaby Testnet powered by Filecoin. You can enable Sybil protection on a number of public files using Polygon ID.

## Features

- Easy Sign In using Rainbow Wallet, no questions asked.
- Can change the contents of the file without worrying about the URL which is going to stay the same.
- Transparent and decentralized storage of personal information.
- If you are a DAO lead, you can token gate / role gate your files using Guild.xyz
- Build your file marketplace where you can sell your files by setting a price on it either in dollars or in Crypto.
- Set up access control on Files.
- Sybil protection using Polygon ID

## Roadmap
- Easy API to add files from anywhere to the user's account
- In built chat system using XMTP + Lens Protocol to enable File sharing
- On platform Video support using Live Peer
- Storing and managing passwords and crucial information using Lit Protocol

## Tech Stack
- Ceramic to store the CIDs
- Web3.storage for storing Files
- SurfDB (WAGMI + RainbowKit + Ceramic) for authentication, database & storage
- Smart Contracts on Multiple Chains
- Chainlink to fetch live prices in Smart Contracts
- Nextjs, Reactjs, TailwindCSS, styled-components for the frontend

##
