import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";
import { Button } from "../ui/button";

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl }) {
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
    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="mt-4 text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="mt-2">
                <Input
                    className="hidden"
                    id="image-upload"
                    type="file"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                />
                {!imageFile ? 
                    <Label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg"
                    >
                        <UploadCloudIcon className="w-10 h-10 text-gray-500 mb-2" />
                        <span className="text-center text-sm text-gray-600">Drag & drop or click to upload Image</span>
                    </Label>
                 : 
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
                }
            </div>
        </div>
    );
}

export default ProductImageUpload;
