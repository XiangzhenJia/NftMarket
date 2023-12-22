import React from "react";
import {Container,Heading,Text} from "@chakra-ui/react";
import NFTGrid from "../components/NFTGrid";
import {useContract} from "@thirdweb-dev/react-core";
import {useNFTs} from "@thirdweb-dev/react";

export default function Buy(){
    const {contract} = useContract("0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7")
    const {data,isLoading} = useNFTs(contract)

    return (
        <Container>
            <NFTGrid isLoading={isLoading} data={data} emptyText={"no"}/>
        </Container>
    )
}