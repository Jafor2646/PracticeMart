import { Fragment } from "react";
import { ChartNoAxesCombined } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "@/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({setOpen}){
    const navigate = useNavigate();
    return <nav className="mt-8 flex-col flex gap-2">
        {
            setOpen ?
            adminSidebarMenuItems.map(menuItem=> <div 
            key={menuItem.id} 
            onClick={()=>{
                navigate(menuItem.path)
                setOpen ? setOpen(false) : null
            }} 
            className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-white hover:bg-muted hover:text-black">
                {menuItem.icons}
                <span>{menuItem.label}</span>
            </div>)
            :
            adminSidebarMenuItems.map(menuItem=> <div 
            key={menuItem.id} 
            onClick={()=>{
                navigate(menuItem.path)
                setOpen ? setOpen(false) : null
            }} 
            className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-gray-500 hover:bg-muted hover:text-black">
                {menuItem.icons}
                <span>{menuItem.label}</span>
            </div>)

        }
    </nav>
}

function AdminSideBar({open, setOpen}) {
    const navigate = useNavigate();
    

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNoAxesCombined size={30}/>
                                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>

                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div 
                    onClick={() => navigate("/admin/dashboard")}
                className="flex cursor-pointer items-center gap-2"
                >
                    <ChartNoAxesCombined size={30}/>
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;