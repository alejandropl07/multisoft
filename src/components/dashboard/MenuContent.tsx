import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { useRouter } from "next/navigation";

export default function MenuContent() {
  const router = useRouter();

  const handleMenuClick = (menuName: string) => {
    router.push(`/${menuName}`);
  };

  const mainListItems = [
    {
      text: "Sobre nosotros",
      icon: <AnalyticsRoundedIcon />,
      onClick: () => handleMenuClick("about-admin"),
    },
    {
      text: "Administrar noticias",
      icon: <HomeRoundedIcon />,
      onClick: () => handleMenuClick("blog-admin"),
    },
    {
      text: "Bulletin",
      icon: <AssignmentRoundedIcon />,
      onClick: () => handleMenuClick("bulletin-admin"),
    },
    {
      text: "Preguntas frecuentes",
      icon: <AssignmentRoundedIcon />,
      onClick: () => handleMenuClick("faq-admin"),
    },
    {
      text: "Patrocinadores",
      icon: <AssignmentRoundedIcon />,
      onClick: () => handleMenuClick("partner-admin"),
    },
    {
      text: "Servicios",
      icon: <AssignmentRoundedIcon />,
      onClick: () => handleMenuClick("services-admin"),
    },
    {
      text: "Testimonios",
      icon: <AssignmentRoundedIcon />,
      onClick: () => handleMenuClick("testimony-admin"),
    },
    {
      text: "Valores",
      icon: <PeopleRoundedIcon />,
      onClick: () => handleMenuClick("values-admin"),
    },
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
