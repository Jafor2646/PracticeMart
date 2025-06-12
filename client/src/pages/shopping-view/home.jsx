import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";


const categoriesWithIcon = [
            {id: "men", label: "Men", icon: ShirtIcon},
            {id: "women", label: "Women", icon: CloudLightning},
            {id: "kids", label: "Kids", icon: BabyIcon},
            {id: "accessories", label: "Accessories", icon: WatchIcon},
            {id: "footwear", label: "Footwear", icon: UmbrellaIcon},
];

function ShoppingHome() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  

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
              categoriesWithIcon.map(item=> <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>

              </Card>)
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;