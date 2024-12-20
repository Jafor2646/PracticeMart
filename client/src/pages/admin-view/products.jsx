import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFromElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const intitialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};

function AdminProducts(){
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(intitialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const {toast} = useToast();
    function onSubmit(event){
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData, 
            image: uploadedImageUrl
        })).then((data) => {
            console.log(data);
            if(data.payload.success){
                dispatch(fetchAllProducts());
                setImageFile(null);
                setOpenCreateProductsDialog(false);
                setFormData(intitialFormData);
                toast({
                    title: 'Product Added Successfully',
                });
            }
        });
    }

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);
    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=> setOpenCreateProductsDialog(true)} >Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
                setOpenCreateProductsDialog(false);
            }}
            >
               <SheetContent side="right" className="overflow-auto bg-white">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile} 
                        uploadedImageUrl={uploadedImageUrl} 
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />
                    <div className="py-6">
                        <CommonForm 
                        onSubmit={onSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText="Add"
                        formControl={addProductFromElements}
                        />
                        
                    </div>
                </SheetContent> 
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;