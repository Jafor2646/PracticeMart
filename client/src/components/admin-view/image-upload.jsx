import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode}) {
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }
    function handleDragOver(e) {
        e.preventDefault();

    }
    function handleDrop(e) {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }

    function handleRemoveImage() {
        setImageFile(null);
        if(inputRef.current) {
            inputRef.current.value = '';    
        }
    }

    async function uploadImageToCouldinary() {
        setImageLoadingState(true);
       const data = new FormData();
       data.append('my_file', imageFile);
       const response = await axios.post(`${VITE_REACT_APP_BACKEND_BASEURL}/api/admin/products/upload-image`, data);
       console.log(response);
       if(response.data?.success){
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false);
       } 
    }

    useEffect(() => {
        if(imageFile) {
            uploadImageToCouldinary();
        }
    }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="mt-4 text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? 'opacity-60' : ''} mt-2`}>
                <Input
                    className="hidden"
                    id="image-upload"
                    type="file"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled={isEditMode}
                />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode ? 'cursor-not-allowed' : ''} cursor-pointer flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-gray-500 mb-2" />
                        <span className="text-center text-sm text-gray-600">Drag & drop or click to upload Image</span>
                    </Label>)
                 : (
                    imageLoadingState ? 
                     <Skeleton className="h-10 bg-gray-100" />:
                    <div className="flex items-center justify-between">
                        <div className="flex items-center"> 
                            <FileIcon className="w-8 h-8 text-gray-700 mr-2"/>
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default ProductImageUpload;
