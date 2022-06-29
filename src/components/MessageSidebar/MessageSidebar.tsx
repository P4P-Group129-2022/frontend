import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import MessageSidebarItem from "../MessageSidebarItem/MessageSidebarItem";
import { SLACK_COLORS } from "../../theme/colors";

import MenuIcon from "@mui/icons-material/Menu";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { styled } from "@mui/material/styles";

const SidebarDivider = styled(Divider)({
  backgroundColor: "#FFFFFF20",
});

/**
 * This component is mostly for display purposes.
 * No functionality is expected with this component.
 * @constructor
 */
function MessageSidebar() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      width={"20vw"}
      bgcolor={SLACK_COLORS.lightPurple}
      color={SLACK_COLORS.sideBarTextColor}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"1rem 1.5rem"}
      >
        <Typography variant={"h4"} fontWeight={"bold"}>
          LGI Inc. {/* Possibly fix this to a better one */}
        </Typography>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"3rem"}
          height={"3rem"}
          borderRadius={"3rem"}
          bgcolor={SLACK_COLORS.sideBarTextColor}
          color={SLACK_COLORS.lightPurple}
        >
          <EditOutlinedIcon fontSize={"inherit"} sx={{
            fontSize: "1.5rem"
          }} />
        </Box>
      </Box>

      <SidebarDivider />

      <Box
        padding={"0 1rem"}
      >
        <MessageSidebarItem icon={<MenuIcon />} title={"All Unread"} />
        <MessageSidebarItem icon={<MessageOutlinedIcon />} title={"Threads"} />
        <MessageSidebarItem icon={<AlternateEmailOutlinedIcon />} title={"Mentions & reactions"} />
        <MessageSidebarItem icon={<ArrowDownwardOutlinedIcon />} title={"Show more"} />
      </Box>

      <SidebarDivider />

      <Box
        padding={"0 1rem"}
      >
        <Box
          marginY={"1rem"}
        >
          <MessageSidebarItem icon={<KeyboardArrowDownOutlinedIcon />} title={"Channels"} />
          <MessageSidebarItem icon={<TagOutlinedIcon />} title={"interns-2022"} />
          <MessageSidebarItem icon={<TagOutlinedIcon />} title={"frontend-devs"} />
          <MessageSidebarItem icon={<AddBoxOutlinedIcon />} title={"Add channels"} />
        </Box>
        <Box
          marginY={"1rem"}
        >
          <MessageSidebarItem icon={<KeyboardArrowDownOutlinedIcon />} title={"Direct Messages"} />
          <MessageSidebarItem icon={<TagOutlinedIcon />} title={"George Clooney"} sx={{
            color: "#FFFFFF"
          }} titleSx={{
            fontWeight: 700
          }} />
          <MessageSidebarItem icon={<TagOutlinedIcon />} title={"Chris Pratt"} />
          <MessageSidebarItem icon={<TagOutlinedIcon />} title={"Emma Stone"} />
          <MessageSidebarItem icon={<AddBoxOutlinedIcon />} title={"Add teammates"} />
        </Box>
      </Box>
    </Box>
  );
}

export default MessageSidebar;