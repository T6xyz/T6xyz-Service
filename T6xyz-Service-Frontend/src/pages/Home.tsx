import './home.css';
import NavBar from "@/components/ui/navbar";
import { useEffect } from "react";
import { Box, Stack, VStack, Text, Heading, Highlight, List, Button, Stat, FormatNumber, Flex} from "@chakra-ui/react";
import { LuCircleCheck } from "react-icons/lu"
import homeVideo1 from '/src/assets/homepage2.mp4'
import homeVideo2 from '/src/assets/springRecording.mov'

export function Home() {
    const queries = ["Data Structures", "Algorithms"]
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('showHome');
              } else {
                entry.target.classList.remove('showHome');
              }
            })
          })
          
          const hiddenElements = document.querySelectorAll('.hiddenHome');
          hiddenElements.forEach((el) => observer.observe(el));  
      }, []);

    return (
        <div>
            <Box h="100vh" w="100%">
                <NavBar />
                <Stack>
                    <Box width="100%" height="100vh">
                        <Box position="absolute" zIndex={1}>
                            <video autoPlay muted loop playsInline disablePictureInPicture style={{width: "100%", height: "100vh", objectFit: "cover", filter: "blur(5px)"}}>
                                <source src={homeVideo1} type="video/mp4" />
                            </video>
                        </Box>
                        <VStack position="absolute" zIndex={2} width="100%" height="100vh" justify="center" className="hiddenHome">
                            <Heading size="5xl" letterSpacing="tight" textShadow="3px 2px 5px black" paddingBottom={1}>
                                <Highlight query={queries} styles={{ color: "teal.600" }}>
                                Learn About Fundamental Data Structures and Algorithms
                                </Highlight>
                            </Heading>
                            <Text fontSize="xl" color="#e8e8e8" width="1150px" lineHeight={1.6} fontFamily="font-family: Arial, Helvetica, sans-serif">
                                Gain insight on how to ace technical interviews at some of the tech industry's most competitive companies.
                                Topics include introductory concepts like Arrays, Binary Search, and Trees all the way to more complex topics like
                                Bitmask Dynamic Programming, Graph Theory, and AVLs.
                            </Text>
                        </VStack>
                    </Box>
                    <Box width="100%" height="100vh">
                        <Box position="absolute" zIndex={1}>
                            <video autoPlay muted loop playsInline disablePictureInPicture style={{width: "100%", height: "100vh", objectFit: "cover", filter: "blur(4.5px)"}}>
                                <source src={homeVideo2} type="video/mp4" />
                            </video>
                        </Box>
                        <VStack position="absolute" zIndex={2} width="100%" height="100vh" justify="center" className="hiddenHome">
                            <Heading size="5xl" letterSpacing="tight" textShadow="3px 2px 5px black" paddingBottom={1}>
                                <Highlight query="Springboot" styles={{ color: "teal.600" }}>
                                Learn How to Develop Backend Services using Springboot
                                </Highlight>
                            </Heading>
                            <Text fontSize="xl" color="#e8e8e8" width="1150px" lineHeight={1.6} fontFamily="font-family: Arial, Helvetica, sans-serif" textShadow="3px 2px 5px black">
                                Learn and gain knowledge on how to develop backend services using Springboot. You will learn the fundamentals 
                                including the Spring Container and Dependency Injections all the way to more advanced topics such as JWT Token Authorization and
                                Spring Security. If your goals are to build a SaaS (Software as a Service) application or a AaaS (AI as a service) application, T6xyz.io is the 
                                service for you.
                            </Text>
                        </VStack>
                    </Box>
                    <Box width="100%" height="100vh">
                        <VStack position="absolute" zIndex={2} width="100%" height="100vh" justify="center" className="hiddenHome">
                            <Heading size="4xl" letterSpacing="tight" paddingBottom={1}>
                                <Highlight query={["Learn", "Software Engineering"]} styles={{ color: "teal.600"}}>
                                Ready to Learn and Bring Your Software Engineering Skillset to the Next Level?
                                </Highlight>
                                <Text fontSize="2xl" color="#e8e8e8" width="1150px" lineHeight={1.6} fontFamily="font-family: Arial, Helvetica, sans-serif" textShadow="3px 2px 5px black" textAlign={"center"} paddingTop={1}>
                                    Join the T6xyz premium community and begin learning! 
                                </Text>
                            </Heading>
                            <Heading size="4xl" letterSpacing="tight" paddingTop={6} paddingBottom={5}>
                                With Premium, You Get Access To
                            </Heading>
                            <List.Root gap="5" variant="plain" align="center" fontSize={18}>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                    <LuCircleCheck />
                                    </List.Indicator>
                                    All Data Structures and Algorithms Lectures
                                </List.Item>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                    <LuCircleCheck />
                                    </List.Indicator>
                                    All Springboot and API Design Lectures
                                </List.Item>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                    <LuCircleCheck />
                                    </List.Indicator>
                                    In-Depth, High Quality Solutions to the Hardest Problems on Leetcode
                                </List.Item>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                    <LuCircleCheck />
                                    </List.Indicator>
                                    Personal Anecdote on the Step-By-Step Process That Got Me Get Offers From Amazon, Uber, and The Home Depot
                                </List.Item>
                            </List.Root>
                            <Box paddingTop={8}>
                                <Flex>
                                    <Button colorPalette="teal" variant="outline" size="2xl">
                                        Buy Premium
                                        <Stat.Root paddingLeft={18}>
                                            <Stat.ValueText color="white">
                                                <FormatNumber value={75} style="currency" currency="USD" />
                                            </Stat.ValueText>
                                            <Stat.HelpText>per year</Stat.HelpText>
                                        </Stat.Root>
                                    </Button>      
                                    <Text style={{alignContent: "center"}} color="light-grey" fontSize="19px" px={5}>or</Text> 
                                    <Button colorPalette="teal" variant="outline" size="2xl">
                                        Try T6xyz For Free
                                        <Stat.Root paddingLeft={18}>
                                            <Stat.HelpText>Linked list lectures only</Stat.HelpText>
                                        </Stat.Root>
                                    </Button>                              
                                </Flex>
                            </Box>
                        </VStack>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}

export default Home;