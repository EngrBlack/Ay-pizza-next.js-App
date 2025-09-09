import DiscoverySection from "../_components/DiscoverySection";
import HeroSection from "../_components/HeroSection";
import PopularDishesSection from "../_components/PopularDishesSection";
import { auth } from "../_libs/auth";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <PopularDishesSection />
      <DiscoverySection />
    </>
  );
}
