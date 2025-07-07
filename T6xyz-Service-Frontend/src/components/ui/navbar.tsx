import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import logo from '/src/assets/T6xyzLogo.png';

  export default function NavBar() {
    
    return (
        <div>
            <Flex as="nav" bg="#050505" color="white" align="center" justify="space-between" height="80px" opacity={3}>
                <Box>
                    <Image src={logo} h="55px" px={10}></Image>
                </Box>

                <Flex gap={4} px={10}>
                    <Link href="#" fontSize="18px" variant="plain">
                        About T6xyz
                    </Link>
                    <Link href="#" px={12} fontSize="18px" variant="plain">
                        Premium
                    </Link>
                    <Button colorPalette="teal" variant="outline" size="lg">
                        Login
                    </Button>
                    <Text style={{alignContent: "center"}} color="light-grey" fontSize="19px" px={2}>or</Text>
                    <Button colorPalette="teal" variant="outline" size="lg">
                        Sign Up
                    </Button>
                </Flex>
            </Flex>
        </div>
    )
  }
  