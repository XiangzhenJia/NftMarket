import type {NFT as NFTType} from "@thirdweb-dev/sdk";
import {Skeleton,Text,SimpleGrid} from "@chakra-ui/react";
import NFT from "./NFT"
import Link from "next/link"

type Props = {
    isLoading:boolean;
    data:NFTType[] | undefined;
    overrideOnclickBehavior?:(nft:NFTType) => void;
    emptyText?: string;
}

export default function NFTGrid({
    isLoading,
    data,
    overrideOnclickBehavior,
    emptyText = "NO nft",}:Props){
    return (
        <SimpleGrid>
            {
                isLoading ? (
                    [...Array(20)].map((_,index) => (
                    <Skeleton key={index} height={"312px"} width={"100%"}/>
                ))
                ) : data && data.length >0 ?(
                    data.map((nft)=>
                    !overrideOnclickBehavior ? (
                        <Link href={`/token/0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7/${nft.metadata.id}`}
                        key={nft.metadata.id}>
                            <NFT nft={nft}/>
                        </Link>
                    ) : (
                        <div key={nft.metadata.id}
                            onClick={()=> overrideOnclickBehavior(nft)}>
                            <NFT nft={nft}/>
                        </div>
                    ))
                ) : (
                    <Text>{emptyText}</Text>
                )
            }
        </SimpleGrid>
    )
}