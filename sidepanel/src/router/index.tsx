import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

import { Home } from "@/pages/home";
import { Omr } from "@/pages/omr";
import { PAGE_ROUTES } from "@/constants/page-routes";

const root = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster theme="system" position="bottom-center" />
    </>
  ),
});

const home = createRoute({
  getParentRoute: () => root,
  path: PAGE_ROUTES.HOME,
  component: Home,
});

const omr = createRoute({
  getParentRoute: () => root,
  path: PAGE_ROUTES.OMR,
  component: Omr,
});

export const routeTree = root.addChildren([home, omr]);
