import './login.css';
import { PasswordInput } from '@/components/ui/password-input';
import { Box, Button, Field, Input, InputGroup, Image, VStack } from '@chakra-ui/react';
import { LuLockKeyhole, LuUser } from 'react-icons/lu';
import logo from '/src/assets/logoCentered.png';
import { ArrowBackIcon } from '@chakra-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

export function Login() {

    return (
        <Box h="100vh" w="100%">
            <Box paddingTop={6} paddingLeft={20}>
                <Link to="/">
                    <Button colorPalette={"teal"} variant="outline" size="xl" width="120px">
                        <ArrowBackIcon h={4.5} w={4.5} />Home
                    </Button>
                </Link>
            </Box>
        <Box h="100vh" w="100%" display="flex" justifyContent="center">
            <VStack position="absolute" height="600px" width="500px" border=".75px solid teal" top="100px" borderRadius={6} className='blur-background'>
                <Box paddingTop={20} paddingBottom={5}>
                    <Image src={logo} h="20" />
                </Box>
                <Box alignItems="center" justifyContent="center">
                    <Field.Root invalid>
                        <InputGroup startElement={<LuUser />}>
                            <Input placeholder="Username" size="lg" border="solid grey 0.75px" outlineOffset={-1} outlineColor={"teal.600"} outlineWidth={"1px"} type='text'/>
                        </InputGroup>
                    </Field.Root>

                    <Field.Root paddingTop="50px">
                        <InputGroup startElement={<LuLockKeyhole />}>
                            <PasswordInput placeholder="Password" size="lg" border="solid grey 0.75px" outlineOffset={-1} outlineColor={"teal.600"} outlineWidth={"1px"} />
                        </InputGroup>
                    </Field.Root>
                    <br></br>
                    <Button colorPalette={"teal"} variant="solid" size="lg" width="100%">
                        Sign In
                    </Button>
                    <br></br>
                    <Box display="flex" justifyContent="space-between" fontSize={14.5} paddingTop={4}>
                        <Link to="#" className='link-class'>Forgot Password?</Link>
                        <Link to="#" className='link-class'>Sign Up</Link>
                    </Box>
                </Box>
            </VStack>
        </Box>
        </Box>
    )
}

export default Login