import './index.css';
import './App.css'
import { Heading, Spinner, Stack, Highlight, Text} from "@chakra-ui/react"
import { useShikiHighlighter } from 'react-shiki';

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
    `;

  const highlightedCode = useShikiHighlighter(code, 'java', 'github-dark-default', {
    showLineNumbers: true,
  });

  return (
    <div>
      {!highlightedCode? (
        <Spinner size = "lg"></Spinner>
      ) : (
        <div>
          <Stack gap = "5" paddingBottom="10">
          <Heading size="3xl" letterSpacing="tight">
            <Highlight query="Spring" styles={{ color: "teal.600" }}>
              Sample code for a Spring Application
            </Highlight>
          </Heading>
          <Text fontSize="md" color="fg.muted">
            Chakra UI is a simple, modular and accessible component library that
            gives you the building blocks you need.
          </Text>
        </Stack>
        <div style={{textAlign: "left", width: "900px"}}>
          {highlightedCode}
        </div>
        </div>
      )}
    </div>
  )
}

export default App
