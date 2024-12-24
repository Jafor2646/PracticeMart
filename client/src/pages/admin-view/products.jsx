import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFromElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "react-router-dom";

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
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const {toast} = useToast();
    function onSubmit(event){
        event.preventDefault();

        currentEditedId !== null ? 
        dispatch(editProduct({
            id : currentEditedId, formData
        })).then((data) => {
            if(data.payload.success){
                dispatch(fetchAllProducts());
                setImageFile(null);
                setOpenCreateProductsDialog(false);
                setFormData(intitialFormData);
                setCurrentEditedId(null);
                toast({
                    title: 'Product Updated Successfully',
                });
            }
        })
        :
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
    function handleDelete(getCurrentProductId){
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if(data.payload.success){
                dispatch(fetchAllProducts());
                toast({
                    title: 'Product Deleted Successfully',
                });
            }   
        });
    }

    function isFormValid(){
       return Object.keys(formData).map(key=>formData[key] !== '').every(item=>item);
    }

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);
    console.log(productList);
    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=> setOpenCreateProductsDialog(true)} >Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {   
                    productList && productList.length > 0 ?
                    productList.map(productItem => <AdminProductTile handleDelete={handleDelete} setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog}  setCurrentEditedId={setCurrentEditedId} product={productItem}/>) : null
                }
            </div>
            <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(intitialFormData);
            }}
            >
               <SheetContent side="right" className="overflow-auto bg-white">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId ? 'Edit Product' : 'Add New Product'}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile} 
                        uploadedImageUrl={uploadedImageUrl} 
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="py-6">
                        <CommonForm 
                        onSubmit={onSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={currentEditedId ? 'Update' : 'Add'}
                        formControl={addProductFromElements}
                        isBtnDisabled={!isFormValid()}
                        />
                        
                    </div>
                </SheetContent> 
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;