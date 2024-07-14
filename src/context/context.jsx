import React, { createContext, useState } from "react";
import run from "../config/gemini"; // Assuming run is an async function that returns a string response

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord + " ");
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      let response;
      if (prompt !== undefined) {
        response = await run(prompt); // Run with provided prompt
        setRecentPrompt(prompt);
      } else {
        response = await run(input); // Run with input if no prompt provided
        setPrevPrompts(prev => [...prev, input]);
        setRecentPrompt(input);
      }

      // Split response handling
      const responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      // Handle formatting and delay
      const newResponse2 = newResponse.split("*").join("<br/>");
      const newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord);
      }

      // Update previous prompts
      setPrevPrompts(prev => [...prev, prompt || input]); // Add the used prompt or input to prevPrompts
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
