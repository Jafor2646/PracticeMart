import { HousePlug, Menu, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSelector } from "react-redux";

function MenuItems(){
  //console.log(shoppingViewHeaderMenuItems);
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-6">
      {
        shoppingViewHeaderMenuItems.map((item) => (<Link key={item.id} to={item.path} className="text-sm font-medium">{item.label}</Link>))
    }
    </nav>
  );
}

function HeaderRightContent(){
  const { user } = useSelector((state) => state.auth);

  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
    <Button variant="outline" size="icon">
    <ShoppingCart className="w-6 h-6"/>
    <span className="sr-only">User Cart</span>
    </Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar>
        <AvatarFallback className="bg-black text-white font-extrabold">{user.userName[0].toUpperCase()}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
}

function ShoppingHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6"/>
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <div className="text-gray-200"><MenuItems /></div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        
        <div>
            <HeaderRightContent />
        </div> 
        
      </div>
    </header>
  );
}   

export default ShoppingHeader;  