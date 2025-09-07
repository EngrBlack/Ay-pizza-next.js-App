import DiscoverySection from "../_components/DiscoverySection";
import HeroSection from "../_components/HeroSection";
import PopularDishesSection from "../_components/PopularDishesSection";

export default async function Page() {
  return (
    <div className="">
      <HeroSection />
      <PopularDishesSection />
      <DiscoverySection />
    </div>
  );
}
