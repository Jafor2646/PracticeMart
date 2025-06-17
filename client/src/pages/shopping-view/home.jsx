import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import nike from "../../assets/nike.png";
import adidas from "../../assets/adidas.svg";
import puma from "../../assets/puma.svg";
import levis from "../../assets/levis.svg";
import zara from "../../assets/zara.svg";
import hm from "../../assets/hm.svg";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";


const categoriesWithIcon = [
            {id: "men", label: "Men", icon: ShirtIcon},
            {id: "women", label: "Women", icon: CloudLightning},
            {id: "kids", label: "Kids", icon: BabyIcon},
            {id: "accessories", label: "Accessories", icon: WatchIcon},
            {id: "footwear", label: "Footwear", icon: UmbrellaIcon},
];

const brandsWithIcon = [
            {id: "nike", label: "Nike", icon: nike},
            {id: "adidas", label: "Adidas", icon: adidas},
            {id: "puma", label: "Puma", icon: puma},
            {id: "levi", label: "Levi's", icon: levis},
            {id: "zara", label: "Zara", icon: zara},
            {id: "h&m", label: "H&M", icon: hm}
];
function ShoppingHome() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {productList, productDetails} = useSelector(state => state.shopProducts);
  const {user} = useSelector(state => state.auth);
  const {toast} = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  
  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem('filters');

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    navigate(`/shop/listing`);
  }


  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId){
      dispatch(addToCart({userId: user?.id, productId: getCurrentProductId, quantity: 1})).then((data) => {
        if(data?.payload?.success){
          dispatch(fetchCartItems(user?.id));
          toast({
            title : "Product is added to Cart",
            className : "bg-white"
          })
        }
      });
    }
    useEffect(() => {
      if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: "price-lowtohigh"}));
  }, [dispatch])  


  //console.log("Product List: ", productList);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))
        }
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))}
        >
          <ChevronLeftIcon className="w-4 h-4"/>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1))}
        >
          <ChevronRightIcon className="w-4 h-4"/>
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {
              categoriesWithIcon.map(item=> (
              <Card onClick={()=>handleNavigateToListingPage(item, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>

              </Card>))
            }
          </div>
        </div>
      </section>

        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              brandsWithIcon.map(item=> (
              <Card onClick={()=>handleNavigateToListingPage(item, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={item.icon} alt={item.id} className="w-12 h-12 mb-4 text-primary"/>
                  <span className="font-bold">{item.label}</span>
                </CardContent>

              </Card>))
            }
          </div>
        </div>
      </section>

      <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              productList && productList.length > 0 ?
              productList.map(productItem => <ShoppingProductTile 
                handleGetProductDetails={handleGetProductDetails} 
                product={productItem} 
                handleAddtoCart={handleAddtoCart}
                />

              )  
              : null
            }
          </div>

      </section>
      <ProductDetailsDialog 
      open={openDetailsDialog} 
      setOpen={setOpenDetailsDialog} 
      productDetails={productDetails} 
      />

    </div>
  );
}

export default ShoppingHome;