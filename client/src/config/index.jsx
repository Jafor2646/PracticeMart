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

export const addProductFromElements = [
    {
        label : "Title",
        name : "title",
        type : "text",
        placeholder : "Enter Product Title",
        commonType : "input",
    },
    {
        label : "Description",
        name : "description",
        type : "text",
        commonType : "textarea",
    },
    {
        label : "Category",
        name : "category",
        commonType : "select",
        options: [
            {id: "men", label: "Men"},
            {id: "women", label: "Women"},
            {id: "kids", label: "Kids"},
            {id: "accessories", label: "Accessories"},
            {id: "footwear", label: "Footwear"},
        ],
    },
    {
        label : "Brand",
        name : "brand",
        commonType : "select",
        options: [
            {id: "nike", label: "Nike"},
            {id: "adidas", label: "Adidas"},
            {id: "puma", label: "Puma"},
            {id: "levi", label: "Levi's"},
            {id: "zara", label: "Zara"},
            {id: "h&m", label: "H&M"},
        ],
    },
    {
        label : "Price",
        name : "price",
        type : "number",
        placeholder : "Enter Product Price",
        commonType : "input",
    },
    {
        label : "Sale Price",
        name : "salePrice",
        type : "number",
        placeholder : "Enter sale Price (Optional)",
        commonType : "input",
    },
    {
        label : "Total Stock",
        name : "totalStock",
        type : "number",
        placeholder : "Enter total stock",
        commonType : "input",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id : "home",
        label : "Home",
        path : "/shop/home",
    },
    {
        id : "men",
        label : "Men",
        path : "/shop/listing",
    },
    {
        id : "women",
        label : "Women",
        path : "/shop/listing",
    },
    {
        id : "kids",
        label : "Kids",
        path : "/shop/listing",
    },
    {
        id : "footwear",
        label : "Footwear",
        path : "/shop/listing",
    },
    {
        id : "accessories",
        label : "Accessories",
        path : "/shop/listing",
    }
];
export const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    accessories: "Accessories",
    footwear: "Footwear",
  };
  
  export const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Levi",
    zara: "Zara",
    "h&m": "H&M",
  };
  
  export const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
    brand: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  