const MainLayout = () => import("layouts/MainLayout.vue");

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") }, // Početna stranica
    ],
  },

  {
    path: "/add/customer",
    component: MainLayout,
    children: [
      { path: "", component: () => import("pages/AddCustomerPage.vue") }, // Stranica za korisnika
    ],
  },
  {
    path: "/add/order",
    component: MainLayout,
    children: [
      { path: "", component: () => import("pages/AddOrderPage.vue") }, // Stranica za korisnika
    ],
  },
  {
    path: "/:catchAll(.*)*", // Catch-all za nepostojeće stranice
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
