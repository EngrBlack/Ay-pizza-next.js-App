import DiscoverySection from "../_components/DiscoverySection";
import HeroSection from "../_components/HeroSection";
import PopularDishesSection from "../_components/PopularDishesSection";
import { auth } from "../_libs/auth";
import { getCategories } from "../_libs/categoryActions";

export default async function Page() {
  const categories = await getCategories();

  return (
    <>
      <HeroSection />
      <PopularDishesSection categories={categories} />
      <DiscoverySection />
    </>
  );
}
