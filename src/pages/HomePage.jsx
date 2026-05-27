// src/pages/HomePage.jsx

import Hero from "../components/home/Hero";
import FeaturedCategories from "../components/home/FeaturedCategories";
import FeaturedListings from "../components/home/FeaturedListings";
import PopularDestinations from "../components/home/PopularDestinations";
import CTABanner from "../components/home/CTABanner";
import HowItWorks from "../components/home/HowItWorks";

const HomePage = () => {
  return (
    <div>
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedCategories />
        <FeaturedListings />
        <CTABanner />
        <PopularDestinations />
      </main>
    </div>
  );
};

export default HomePage;
