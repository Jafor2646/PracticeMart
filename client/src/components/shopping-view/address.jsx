import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";



const initialAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''
}

function Address({setCurrentSelectedAddress}){

    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedid] = useState(null);
    const dispatch = useDispatch();

    const {user} = useSelector(state=>state.auth);
    const {addressList} = useSelector(state=>state.shopAddress);
    const {toast} = useToast();
    function handleManageAddress(event){
        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null){
            toast({
                title: "You can add max 3 addresses",
                variant: "destructive"
            })
            setFormData(initialAddressFormData);
            return;
        }

        currentEditedId !== null ? dispatch(editaAddress({
            userId: user?.id, addressId: currentEditedId, formData
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setCurrentEditedid(null);
                setFormData(initialAddressFormData);
                toast({
                    title: "Address Updated successfully"
                })
            }
        }) :

        dispatch(addNewAddress({
            ...formData,
            userId : user?.id
        })).then(data=>{
            console.log(data);

            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setFormData(initialAddressFormData);
                toast({
                    title: "Address added successfully"
                })
            }
        })
    }

    useEffect(()=>{
        dispatch(fetchAllAddresses(user?.id));
    },[dispatch, addressList])

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress._id}));
        toast({
                title: "Address deleted successfully"
            })
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentEditedid(getCurrentAddress._id);
        setFormData({
            ...formData,
            address : getCurrentAddress.address,
            city : getCurrentAddress.city,
            phone : getCurrentAddress.phone,
            pincode : getCurrentAddress.pincode,
            notes : getCurrentAddress.notes
        })
    }
    function isFormValid(){
        return Object.keys(formData)
        .map(key=> formData[key].trim() !== '')
        .every(item=> item)
    }
    function handleCancel(){
        setCurrentEditedid(null);
        setFormData(initialAddressFormData);
    }
    
    return <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
                addressList && addressList.length > 0 ?
                addressList.map(singleAddressItem=> 
                    <AddressCard 
                        handleDeleteAddress={handleDeleteAddress} 
                        addressInfo={singleAddressItem} 
                        handleEditAddress={handleEditAddress}
                        setCurrentSelectedAddress={setCurrentSelectedAddress}
                    />)
                :
                null
            }
        </div>
        <CardHeader>
            <CardTitle>{
                currentEditedId !== null ? 'Edit Address' : 'Add New Address'
            }</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
            <CommonForm 
                formControl={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                onSubmit={handleManageAddress}
                isBtnDisabled={!isFormValid()}
            />

            {
                currentEditedId !== null ?
                <div className="flex flex-col justify-center border border-red-300 hover:bg-red-300 border-rounded">
                <Button onClick={handleCancel}>Cancel</Button>
                </div>
                :
                null
            }
        </CardContent>
    </Card>
}

export default Address;