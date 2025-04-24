import Topbar from "./components/TopNavbar";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
 

export default function Home() {

  return (

    <div>
      
       <Topbar />
       <Navbar />
       <HeroSection />
       <ProductGrid />
       <Footer />

    </div>
   
  );
}
