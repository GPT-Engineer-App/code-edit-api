import React, { useState } from "react";
import { Box, Button, Textarea, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const toast = useToast();

  const handleCodeChange = (event) => setCode(event.target.value);
  const handlePromptChange = (event) => setPrompt(event.target.value);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, prompt }),
    });

    if (!response.ok) {
      toast({
        title: "Error",
        description: "Failed to fetch edited code",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data = await response.json();
    setEditedCode(data.editedCode);
  };

  return (
    <VStack spacing={4} p={5}>
      <Heading as="h1" size="xl">
        Code Editor API
      </Heading>
      <Textarea placeholder="Enter your code here..." value={code} onChange={handleCodeChange} size="lg" height="200px" />
      <Textarea placeholder="Enter your edit prompt here..." value={prompt} onChange={handlePromptChange} size="lg" height="100px" />
      <Button leftIcon={<FaPaperPlane />} colorScheme="teal" onClick={handleSubmit}>
        Send Code
      </Button>
      {editedCode && (
        <>
          <Heading as="h2" size="lg">
            Edited Code
          </Heading>
          <Text as="pre" p={3} borderWidth="1px" borderRadius="lg" width="full">
            {editedCode}
          </Text>
        </>
      )}
    </VStack>
  );
};

export default Index;
