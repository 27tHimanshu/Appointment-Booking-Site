export const userMenu = (userId) => [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: "fa-solid fa-list",
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: "fa-solid fa-user-doctor",
  },
  {
    name: "Profile",
    path: `/doctor/profile/${userId}`, // Use dynamic route with userId
    icon: "fa-solid fa-user",
  },
];

// admin menu
export const adminMenu = (userId) => [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: "fa-solid fa-user-doctor",
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: "fa-solid fa-user",
  },
  {
    name: "Profile",
    path: `/doctor/profile/${userId}`, // Use dynamic route with userId
    icon: "fa-solid fa-user",
  },
];
