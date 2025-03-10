import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";






function UserCartWrapper() {
    return (
        <SheetContent className="sm:max-w-md bg-white">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">

            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">$1000</span>
                </div>
            </div>

            <Button className="w-full mt-6 bg-black text-white rounded-xl hover:text-black hover:bg-green-200">Checkout</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;