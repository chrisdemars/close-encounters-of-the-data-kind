import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

export const SearchBar = ({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "5rem",
        "& > :not(style)": { m: 1, width: "50ch", fontWeight: "bold" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        id="outlined-basic"
        label="Search for UFO Sightings"
        variant="outlined"
        aria-label="Search for UFO Sightings"
      />

      <Typography variant="body2" color="text.secondary">
        *This is a list of some sample data of UFO/UAPUSO abductions and
        sightings in the United States. Search for an encounter by name or
        location.
      </Typography>
    </Box>
  );
};
