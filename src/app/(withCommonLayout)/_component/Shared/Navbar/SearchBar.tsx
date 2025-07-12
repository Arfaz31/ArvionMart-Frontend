import { Box, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ mobile = false }: { mobile?: boolean }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease",
        "&:hover": { borderColor: "#1565c0" },
        "&:focus-within": {
          borderColor: "#1565c0",
          boxShadow: "0 0 0 3px rgba(21, 101, 192, 0.1)",
        },
        flexGrow: mobile ? 1 : undefined,
        ml: mobile ? 2 : undefined,
      }}
    >
      <InputBase
        placeholder="Search..."
        sx={{
          ml: 2,
          flex: 1,
          fontSize: "0.875rem",
          color: "#374151",
          width: mobile ? undefined : { xs: "80px", sm: "140px" },
          "& .MuiInputBase-input": {
            padding: "10px 0",
            "&::placeholder": {
              color: "#9ca3af",
              opacity: 1,
            },
          },
        }}
      />
      <IconButton
        type="button"
        aria-label="search"
        sx={{
          p: "8px",
          mr: 0.5,
          color: "#6b7280",
          transition: "color 0.2s ease",
          "&:hover": {
            color: "#1565c0",
            backgroundColor: "rgba(21, 101, 192, 0.05)",
          },
        }}
      >
        <Search sx={{ fontSize: "1.1rem" }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
