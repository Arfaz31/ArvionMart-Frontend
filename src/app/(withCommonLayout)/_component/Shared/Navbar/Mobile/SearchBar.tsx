import { Box, Button, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding: "8px",
        bgcolor: "#fafafa",
      }}
    >
      <TextField
        placeholder="Search in here…"
        variant="outlined"
        type="search"
        sx={{
          width: "100%",
        }}
        slotProps={{
          input: {
            sx: {
              height: "40px",
              padding: "8px",
              borderRadius: "8px",
            },
            endAdornment: (
              <Button
                sx={{
                  height: "30px",
                }}
              >
                Search
              </Button>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
