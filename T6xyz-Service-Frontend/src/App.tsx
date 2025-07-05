import './App.css'
import { ShikiHighlighter } from 'react-shiki'
import { Heading, Highlight, Stack, Text } from "@chakra-ui/react"

function App() {

  const code = `
  package com.service.backend;

  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;

  @SpringBootApplication
  public class BackendApplication {

    public static void main(String[] args) {
      SpringApplication.run(BackendApplication.class, args);
    }
  }
  `; // input code
  

  return (
    <div style={{marginBottom: "100px"}}>
        <Stack>
          <Heading size="3xl" letterSpacing="tight">
            <Highlight query="with speed" styles={{ color: "teal.600" }}>
              T6xyz.IO
            </Highlight>
          </Heading>
          <Text fontSize="md" color="fg.muted">
            This is sample code below for Spring Application
          </Text>
        </Stack>
        <br></br>
        <ShikiHighlighter
        language="java"
        className="code-block"
        theme="github-dark-default"
        showLanguage={true}
        addDefaultStyles={true}
        showLineNumbers={true}
        startingLineNumber={1}
        as="div"
        style={{
          textAlign: "left",
          fontSize: "16px"
        }}
      >
        {code}
      </ShikiHighlighter>
    </div>
  )
}

export default App
