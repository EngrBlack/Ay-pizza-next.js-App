import { auth } from "@/app/_libs/auth";
import DiscoverySection from "../_components/DiscoverySection";
import HeroSection from "../_components/HeroSection";
import PopularDishesSection from "../_components/PopularDishesSection";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  console.log(user);

  return (
    <>
      <HeroSection />
      <PopularDishesSection />
      <DiscoverySection />
    </>
  );
}
