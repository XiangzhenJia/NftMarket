import {NFT} from "@thirdweb-dev/sdk"
import {ThirdwebNftMedia,useContract,useValidDirectListings,useValidEnglishAuctions} from "@thirdweb-dev/react";
import {Skeleton ,Text,Box} from "@chakra-ui/react";

type Props = {
    nft:NFT;
};

export default function NFTComponent({nft}:Props){
    const {contract:marketplace,
        isLoading:loadingMarketplace} = useContract("0x828Af316902d8220118c5B8A264ABCaD8E235918","marketplace-v3");
    console.log(234)
    // @ts-ignore
    const {data:directListing,isLoading:loadingDirectListing} =  useValidDirectListings(marketplace,
        // {
        //     tokenContract:"0xA61F42Ed9763099e0DE63ee7C67cA118B3F0AdD7",
        //     tokenId:nft.metadata.id,
        // }
    );
    return (
      <div>
          <ThirdwebNftMedia metadata={nft.metadata}/>
          <Text>id:{nft.metadata.id}</Text>
          <Text>id:{nft.metadata.name}</Text>
          <Box>
              {loadingMarketplace || loadingDirectListing ? (
                    <Skeleton></Skeleton>
              ):directListing&&directListing[0]?(
                <Text>{`${directListing[+nft.metadata.id]?.currencyValuePerToken.displayValue}
                 ${directListing[+nft.metadata.id]?.currencyValuePerToken.symbol}
                 `}</Text>
              ):(
                <Text>Not Listed</Text>
              )}
          </Box>
      </div>
    );
}