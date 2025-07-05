import './index.css';
import './App.css'
import { Spinner} from "@chakra-ui/react"
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
        <div style={{textAlign: "left", width: "900px"}}>
          {highlightedCode}
        </div>
      )}
    </div>
  )
}

export default App
