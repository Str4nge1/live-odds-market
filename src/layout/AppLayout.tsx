import { Box, useTheme } from "@mui/material";
import { useState, type FC, type PropsWithChildren } from "react";
import { DEFAULT_SIDEBAR_WIDTH } from "@config";
import PositionsSidebar from "@features/live-market/PositionsSidebar";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: sidebarOpen
            ? `calc(100% - ${DEFAULT_SIDEBAR_WIDTH}px)`
            : "100%",
          p: 1,
        }}
      >
        {children}
      </Box>

      <PositionsSidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
    </Box>
  );
};

export default AppLayout;
