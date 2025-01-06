import { Dialog, DialogContent } from "../ui/dialog";


function ProductDetailsDialog({open, setOpen, productDetails}){
    console.log(productDetails);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-gray-200 grid grid-col-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[38vw]">
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
                
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;