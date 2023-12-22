import {Avatar,Box,Flex,Heading,Link,Text} from "@chakra-ui/react";
import {ConnectWallet,useAddress} from "@thirdweb-dev/react";
import NextLink from 'next/link';

export function Navbar(){
    return (
<div>
    <Link as={NextLink} href={'/'}>
        home
    </Link>
    <Link as={NextLink} href='/buy' >
buy
    </Link>
</div>
    )
}