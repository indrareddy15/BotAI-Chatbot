import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { ThemeContext } from "../../Themes/Contexts";
import Input from "../../components/InputChat/Input";
import ChatCard from "../../components/ChatCard/ChatCard";
import FilterByRating from "../../components/Filter/Filter";

const PastConversation = () => {
  const screenSize = useMediaQuery("(max-width:768px)");
  const context = useOutletContext();
  const themeContext = useContext(ThemeContext);
  const [chats, setChats] = useState([]);
  const [option, setOption] = useState(0);
  const [filteredChats, setFilteredChats] = useState([]);
  const navigate = useNavigate();

  function getMonthFromNo(no) {
    switch (no) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "OCT";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return;
    }
  }
  function getDatedetails(date = new Date()) {
    date = new Date(date);
    let current = new Date();
    if (
      date.getFullYear() === current.getFullYear() &&
      date.getMonth() === current.getMonth()
    ) {
      if (date.getDay() === current.getDay()) {
        return "Today's Chat";
      }
      if (date.getDay() === current.getDay() - 1) {
        return "Yesterday's Chat";
      }
      return `${
        date.getDate() +
        " " +
        getMonthFromNo(date.getMonth()) +
        " " +
        date.getFullYear()
      }`;
    }
  }

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
    if (savedChats.length > 0) {
      setChats(savedChats);
      setFilteredChats(savedChats);
    }
    console.log(savedChats);
  }, []);

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
        sx={{ mb: 1, height: "100%", scrollbarWidth: "none" }}
        gap={10}
        overflow={"scroll"}
        justifyContent={"end"}
      >
        <Typography
          component={"h1"}
          variant="p"
          sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}
        >
          Conversation History
        </Typography>

        {chats?.length > 0 && (
          <FilterByRating
            option={option}
            setOption={setOption}
            chats={chats}
            setFilteredChats={setFilteredChats}
          />
        )}

        {filteredChats?.length > 0 ? (
          filteredChats.map((ele, idx) => (
            <Stack
              kry={idx}
              bgcolor={"primary.main"}
              borderRadius={3}
              spacing={1}
              m={3}
              mt={6 + 3}
              p={3}
              position={"relative"}
            >
              <Typography
                component={"h3"}
                variant="p"
                position={"absolute"}
                top={-44}
                sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}
              >
                {getDatedetails(ele?.human?.time) || "Privious Chat"}
              </Typography>

              <ChatCard key={idx} details={ele?.human} isReadOnly />
              <ChatCard key={idx + "ai"} details={ele?.AI} isReadOnly />
            </Stack>
          ))
        ) : (
          <Box
            component={"p"}
            variant="p"
            sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}
          >
            No History
          </Box>
        )}
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
        }}
        page={"pastconversation"}
      />
    </Stack>
  );
};

export default PastConversation;
