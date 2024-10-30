import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { ThemeContext } from "../../Themes/Contexts";
// import logoImg from "../../assets/Group 1000011097.png";
import Input from "../../components/InputChat/Input";
import Card from "../../components/Card/Card";
import DefaultChats from "../../components/DefaultChats/DefaultChats";
import AIData from "../../AIData/ai-data.json";
import ChatCard from "../../components/ChatCard/ChatCard";

const HomePage = () => {
  const screenSize = useMediaQuery("(max-width:768px)");
  const context = useOutletContext();
  const themeContext = useContext(ThemeContext);
  const { chats, setChats } = useOutletContext();
  const chatId = useRef(Number(localStorage.getItem("id") || 1));
  const scrollRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView();
    console.log("scr");
  });

  const getAnswer = (que) => {
    console.log(que);
    const ans = AIData.find(
      (data) => que.toLowerCase() === data.question.toLowerCase()
    );
    console.log(ans);
    let answer = ans?.response || "Sorry, I did't understand query!";
    chatId.current = Number(localStorage.getItem("id"));
    setChats((prev) => [
      ...prev,
      {
        id: chatId.current,
        human: {
          type: "Human",
          chat: que,
          time: new Date(),
          id: chatId.current,
        },
        AI: {
          type: "AI",
          chat: answer,
          time: new Date(),
          id: chatId.current + 1,
          rating: null,
          feedBack: "",
        },
      },
    ]);
    chatId.current++;
    chatId.current++;
    localStorage.setItem("id", chatId.current);
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        background:
          screenSize && themeContext.mode === "light"
            ? "linear-gradient(180deg, #F9FAFA 59%, #EDE4FF 100%)"
            : "",
      }}
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Navbar handleSidebar={context.handleSidebar} />
      <Box
        ref={scrollRef}
        sx={{ mb: 1, height: "100%", scrollbarWidth: "none" }}
        gap={10}
        overflow={"scroll"}
        display={!chats?.length > 0 && "flex"}
        justifyContent={"end"}
      >
        {!chats?.length > 0 && (
          <DefaultChats getAnswer={getAnswer}></DefaultChats>
        )}
        {chats.length > 0 &&
          chats.map((ele, idx) => (
            <>
              <ChatCard key={idx} details={ele?.human} setChats={setChats} />
              <ChatCard key={idx} details={ele?.AI} setChats={setChats} />
            </>
          ))}
      </Box>
      <Input
        handleSave={() => {
          localStorage.setItem(
            "chats",
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem("chats")) || []),
              ...chats,
            ])
          );
          setChats([]);
          // navigate('/history')
        }}
        getAnswer={getAnswer}
      />
    </Stack>
  );
};

export default HomePage;
