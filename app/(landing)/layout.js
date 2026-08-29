import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingLayout({ children }) {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </>
  );
}
