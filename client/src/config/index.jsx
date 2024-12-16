import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const registerFormControl = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter Your User Name",
        commonType: "input",
        type: "text",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter Your Email",
        commonType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter Your Password",
        commonType: "input",
        type: "password",
    }

];

export const loginFormControl = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter Your Email",
        commonType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter Your Password",
        commonType: "input",
        type: "password",
    }

];


export const adminSidebarMenuItems = [
    {
        id : "dashboard",
        label : "Dashboard",
        path : "/admin/dashboard",
        icons: <LayoutDashboard />
    },
    {
        id : "products",
        label : "Products",
        path : "/admin/products",
        icons : <ShoppingBasket />
    },
    {
        id : "orders",
        label : "Orders",
        path : "/admin/orders",
        icons : <BadgeCheck />
    },
];