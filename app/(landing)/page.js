import {
  LandingHero,
  LandingFeatures,
  LandingHowItWorks,
  LandingTestimonials,
  LandingCTA,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingCTA />
    </>
  );
}
