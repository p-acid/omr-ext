import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";

import { Home } from "@/pages/home";
import { Omr } from "@/pages/omr";

const root = createRootRoute({
  component: Outlet,
});

const home = createRoute({
  getParentRoute: () => root,
  path: "/",
  component: Home,
});

const omr = createRoute({
  getParentRoute: () => root,
  path: "/omr",
  component: Omr,
});

export const routeTree = root.addChildren([home, omr]);
