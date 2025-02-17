import config from "@/config"

export const pageTitle = (title: string): string => {
  return (document.title =
    title + ` | ${config.appName} - ${config.appDescription}`);
};