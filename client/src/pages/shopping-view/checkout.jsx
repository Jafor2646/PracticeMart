import Address from '@/components/shopping-view/address';
import image from '../../assets/account.jpg';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { useToast } from '@/hooks/use-toast';


function ShoppingCheckout() {

  const {cartItems} = useSelector(state=>state.shopCart);

  const dispatch = useDispatch();

  const {user} = useSelector(state=>state.auth);

  const {approvalURL} = useSelector(state=>state.shopOrder)

  const [currentSelectedAddress, setCurrentSelectedAddress]= useState(null);

  const [isPaymentStart, setIsPayementStart] = useState(false);

  const {toast} = useToast();

  function handleInitiatePaypalPayment(){

    if(cartItems.length===0){
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: 'destructive'
      })

      return;
    }

    if(currentSelectedAddress === null){
      toast({
        title: "Please select one address to proceed.",
        variant: 'destructive'
      })

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          Number(singleCartItem?.salePrice) > 0
    ? Number(singleCartItem?.salePrice)
    : Number(singleCartItem?.price),
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: Number(totalCartAmount).toFixed(2),
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log(orderData);
    dispatch(createNewOrder(orderData)).then((data)=>{
      console.log(data);
      if(data?.payload.success){
        setIsPayementStart(true);
      }else{
        setIsPayementStart(false);
      }
    })

    if(approvalURL){
      window.location.href = approvalURL;
    }
  }



  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
  ? cartItems.items.reduce((sum, currentItem) =>
      sum + ((currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity), 0)
  : 0;
    return (
      <div className="flex flex-col">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={image}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
          <div className='flex flex-col gap-4'>
            {cartItems && cartItems.items && cartItems.items.length > 0 ?
            cartItems.items.map(item => <UserCartItemsContent cartItem={item} />) : null
          }
          <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
          </div>
          <div className='rounded-xl mt-4 w-full bg-black text-white'>
          <Button onClick={handleInitiatePaypalPayment} className="w-full">Checkout with paypal</Button>
        </div>
        </div>
      </div>
    </div>
      
    );
  }
  
  export default ShoppingCheckout;