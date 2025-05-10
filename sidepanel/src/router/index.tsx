import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";

import { Home } from "@/pages/home";
import { Omr } from "@/pages/omr";
import { pageRoutes } from "@/constants/page-routes";

const root = createRootRoute({
  component: Outlet,
});

const home = createRoute({
  getParentRoute: () => root,
  path: pageRoutes.home,
  component: Home,
});

const omr = createRoute({
  getParentRoute: () => root,
  path: pageRoutes.omr,
  component: Omr,
});

export const routeTree = root.addChildren([home, omr]);
