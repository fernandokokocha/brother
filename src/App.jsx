import './App.css';
import { useState } from "react";
import { AzureOpenAI } from "openai";

// You will need to set these environment variables or edit the following values
const endpoint = "";
const apiKey = "";
const apiVersion = "2024-02-15-preview";
const deployment = "gpt-4"; //This must match your deployment name.

function App() {
  const [prompt, setPrompt] = useState("Brother, would you spare me some of your oats?");
  const [sent, setSent] = useState(false);
  const [responded, setResponded] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setPrompt(event.target.value);
  }

  const handleSendClick =async () => {
    setSent(true);
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
    const result = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a brother pig that is not willing to share anything. Respond ruthless and dramatic." },
        { role: "user", content: prompt },
      ],
      model: "",
    });

    let newResponse = ""; 
    for (const choice of result.choices) {
      newResponse += choice.message.content;
    }
    setResponse(newResponse);
    setResponded(true);
  }
  
  return (
    <>
      { !sent &&
        <>
          <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
            <textarea value={prompt} rows="4" cols="50" onChange={handleChange} />
          </div>
          <button style={{ backgroundColor: 'red', marginTop: 20 }} onClick={handleSendClick}>Send</button>
        </>
      }
      { sent &&
        <>
          <div style={{ marginBottom: 10 }} >{prompt}</div>
          { !responded && <>Waiting for response...</>}
          { responded && <>{response}</>}
        </>
      }
      <div>Done by Hawat</div>
    </>
  )
}

export default App
