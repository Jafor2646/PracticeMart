import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";




function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress}) {
    return (
        <Card>
            <CardContent className="grid p-4 gap-4">
                <Label>Address: {addressInfo.address}</Label>
                <Label>City: {addressInfo.city}</Label>
                <Label>Pincode: {addressInfo.pincode}</Label>
                <Label>Phone: {addressInfo.phone}</Label>
                <Label>Notes: {addressInfo.notes}</Label>
            </CardContent>
            <CardFooter className="p-1 flex justify-between">
                <Button 
                    className="border border-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded"
                    onClick={()=>handleEditAddress(addressInfo)}
                >
                    Edit
                </Button>
                <Button 
                    className="border border-red-800 hover:bg-red-800 hover:text-white px-4 py-2 rounded"
                    onClick={()=>handleDeleteAddress(addressInfo)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}


export default AddressCard;