import {Avatar, Box, Container, Flex, Input, SimpleGrid, Skeleton, Stack, Text} from "@chakra-ui/react";
import {
    MediaRenderer,
    ThirdwebNftMedia,
    Web3Button,
    useContract,
    useMintToken,
    useValidDirectListings
} from "@thirdweb-dev/react";
import {ThirdwebSDK,NFT} from "@thirdweb-dev/react";
import {GetStaticPaths,GetStaticProps} from "next";
import Link from "next/link"
import ThreadStream from "thread-stream";

type Props = {
    nft:NFT;
    contractMetadata:any;
};



export default function TokenPage({nft,contractMetadata}:Props){
    const {contract:marketplace,
        isLoading:loadingMarketplace} = useContract("0x828Af316902d8220118c5B8A264ABCaD8E235918","marketplace-v3");
    const {contract:nftCollection} = useContract("0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7")
    // @ts-ignore
    const {data:directListing,isLoading:loadingDirectListing} =  useValidDirectListings(marketplace,
        {
            tokenContract:"0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7",
            tokenId:nft.metadata.id,
        }
    );



    return (
        <Container>
            <SimpleGrid>
                <Stack >
                    <Box>
                        <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
                            <ThirdwebNftMedia metadata={nft.metadata} />
                        </Skeleton>
                    </Box>
                    <Box>
                        <Text>Description:</Text>
                        <Text>{nft.metadata.description}</Text>
                    </Box>
                    <Box>
                        <Text>Traits:</Text>
                        {/*<SimpleGrid>*/}
                        {/*    {Object.entries(nft?.metadata?.attributes || {}).map(*/}
                        {/*        ([key,value]) =>(*/}
                        {/*            <Flex key={key} >*/}
                        {/*                <Text>{value.trait_type}</Text>*/}
                        {/*                <Text>{value.value}</Text>*/}
                        {/*            </Flex>*/}
                        {/*        )*/}
                        {/*    )}*/}
                        {/*</SimpleGrid>*/}
                    </Box>
                </Stack>
            </SimpleGrid>
        </Container>
    )
}


export const getStaticProps:GetStaticProps = async (context) => {
    const tokenId = context.params?.tokenId as string;
    const sdk = new ThirdwebSDK("mumbai",
        {clientId: "0d7c5797a6b0ffd9eb2b74c3b1aa371f",}
);
    const contract = await sdk.getContract("0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7")
    const nft = await contract.erc721.get(tokenId);
    let contractMetadata;
    try{
        contractMetadata = await contract.metadata.get();
    }catch (e){}

    return {
        props:{
            nft,
            contractMetadata:contractMetadata  || null,
        },
        revalidate:1,
    };
};

export const getStaticPaths:GetStaticPaths = async () => {
    // setTimeout(()=>{},2000)
    // const sdk = new ThirdwebSDK("mumbai");
    // const contract  = await sdk.getContract("0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7");
    // setTimeout(()=>{},2000)
    const incrementArrayMap = (n: number): number[] => Array(n).fill(0).map((_, index) => index);
    const nfts = incrementArrayMap(5);
    console.log(nfts)
    const paths = nfts.map((nft)=>{
        return {
            params:{
                contractAddress:"0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7",
                tokenId:nft.toString(),
            },
        };
    });
    return {
        paths,
        fallback:"blocking",
    };
};

