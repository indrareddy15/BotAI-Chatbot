/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FilterByRating = ({ option, setOption, setFilteredChats, chats }) => {
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  React.useEffect(() => {
    setFilteredChats(filter(chats, option));
  }, [option]);

  function filter(list, keyword) {
    if (option === 0) return list;
    let filtered = chats.filter((item) => {
      console.log(item);
      if (item?.AI?.rating === keyword || 0) return item;
    });
    console.log(filtered);
    return filtered;
  }
  return (
    <Box sx={{ minWidth: 120, m: 3 }}>
      <InputLabel id="demo-simple-select-label">Filter by rating</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={option}
        onChange={handleChange}
        sx={{ width: { xs: "100%", md: "30%" } }}
      >
        <MenuItem value={0}>All Ratings</MenuItem>
        <MenuItem value={null}>No rating</MenuItem>
        <MenuItem value={1}>1 Star</MenuItem>
        <MenuItem value={2}>2 Stars</MenuItem>
        <MenuItem value={3}>3 Stars</MenuItem>
        <MenuItem value={4}>4 Stars</MenuItem>
        <MenuItem value={5}>5 Stars</MenuItem>
      </Select>
    </Box>
  );
};

export default FilterByRating;
