import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";


function ProductDetailsDialog({open, setOpen, productDetails}){
    console.log(productDetails);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="h-[30vw] bg-gray-200 grid grid-col-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[30vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img 
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={400}
                        height={400}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                    <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : null}`}>${productDetails?.price}</p>
                    {
                        productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p> : null
                    }
                </div>
                <div className="rounded-lg flex justify-center align-middle mt-5 mb-5 bg-black text-white w-full">
                    <Button className="w-full">Add to Cart</Button>
                </div>
                <div className="max-h-[300px] overflow-auto">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                </div>
                <div className="grid gap-6">
                    <div className="flex gap-4">
                        <Avatar className="w-10h-10 ">
                            <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;