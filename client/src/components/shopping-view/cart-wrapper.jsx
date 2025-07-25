import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";






function UserCartWrapper({ cartItems, setOpenCartSheet }) {

    const  navigate = useNavigate();
    const totalCartAmount = cartItems && cartItems.length > 0 ?
        cartItems.reduce((sum, currentItem) => 
            sum + (cartItems?.salePrice > 0 ? currentItem?.salePrice 
                : currentItem?.price)*currentItem?.quantity,0
            ):0; 

    return (
        <SheetContent className="sm:max-w-md bg-white">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4 ">
                {
                    cartItems && cartItems.length > 0 ?
                    cartItems.map(item => <UserCartItemsContent cartItem={item} />) 
                    :
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>

            <Button 
                onClick={
                    ()=>{ 
                        navigate('/shop/checkout');
                        setOpenCartSheet(false);
                }} 
                className="w-full mt-6 bg-black text-white rounded-xl hover:text-black hover:bg-green-200"
            >
                Checkout
            </Button>
        </SheetContent>
    );
}

export default UserCartWrapper;