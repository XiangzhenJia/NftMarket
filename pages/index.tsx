import {ConnectWallet, useValidDirectListings, useContract, MediaRenderer, ThirdwebSDK} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import type { NextPage } from "next";
import {Container,Heading} from "@chakra-ui/react";


 const Home: NextPage = () => {
     console.log("123")

ss()
     return (
         <Container>
             <Heading>123</Heading>
         </Container>
     );

};

 async function ss(){


    const sdk = new ThirdwebSDK("mumbai",
        {clientId: "0d7c5797a6b0ffd9eb2b74c3b1aa371f",}
    );
    const contract = await sdk.getContract("0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7")
    const nft = await contract.erc721.get(1);
    let contractMetadata;
    try{
        contractMetadata = await contract.metadata.get();
    }catch (e){}
     console.log(contractMetadata)
}



export default Home;
