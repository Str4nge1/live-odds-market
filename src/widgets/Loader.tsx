import type { FC } from "react";
import {
  Box,
  CircularProgress,
  Fade,
  type CircularProgressProps,
} from "@mui/material";

const Loader: FC<CircularProgressProps> = (props) => {
  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          padding: 10,
          alignItems: "center",
          alignContent: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress {...props}/>
      </Box>
    </Fade>
  );
};

export default Loader;
