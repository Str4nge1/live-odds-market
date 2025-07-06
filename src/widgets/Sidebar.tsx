import { type FC, type ReactNode } from "react";
import {
  Drawer,
  IconButton,
  styled,
  useTheme,
  Box,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DEFAULT_SIDEBAR_POSITION, DEFAULT_SIDEBAR_WIDTH } from "@config";
import type { SidebarActions } from "@types";

const SidebarHeader = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface SidebarProps {
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
  title: string;
  actions?: SidebarActions;
  position?: "left" | "right";
  width?: number;
}

const Sidebar: FC<SidebarProps> = ({
  children,
  open,
  onToggle,
  title,
  position = DEFAULT_SIDEBAR_POSITION,
  width = DEFAULT_SIDEBAR_WIDTH,
  actions,
}) => {
  const theme = useTheme();

  const ArrowIcon =
    position === "left"
      ? open
        ? ChevronLeft
        : ChevronRight
      : open
      ? ChevronRight
      : ChevronLeft;

  return (
    <Box display={"flex"} position={"relative"}>
      <Tooltip title={open ? "Collapse sidebar" : "Expand sidebar"}>
        <IconButton
          onClick={onToggle}
          sx={{
            position: "fixed",
            zIndex: theme.zIndex.drawer + 1,
            borderRadius: theme.spacing(1),
            [position]: open ? width : 0,
            ...(open
              ? {
                  transform: `translateX(${
                    position === "right" ? "50%" : "-50%"
                  })`,
                }
              : {}),
            top: "50%",
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create([position], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: theme.shadows[2],

            "&:hover": {
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <ArrowIcon />
        </IconButton>
      </Tooltip>

      <Drawer
        sx={{
          width: open ? width : 0,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: open ? width : 0,
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            borderRight: "none",
            boxShadow: theme.shadows[2],
            backgroundColor: theme.palette.background.paper,
          },
        }}
        variant="permanent"
        anchor={position}
        open={open}
      >
        <SidebarHeader>{title}</SidebarHeader>
        <Box
          width="100%"
          height={"100%"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <Box width={"100%"} flex={1} maxHeight={700} overflow={"auto"}>
            {children}
          </Box>
          {actions?.length ? (
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-evenly"}
            >
              {actions.map(({ label, execute, ...rest }) => (
                <Button {...rest} onClick={execute}>
                  {label}
                </Button>
              ))}
            </Box>
          ) : null}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
