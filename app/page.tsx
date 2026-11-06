import Hero from "@/components/home/Hero";
import RecruiterSnapshot from "@/components/home/RecruiterSnapshot";
import ProfessionalSummary from "@/components/home/ProfessionalSummary";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Expertise from "@/components/home/Expertise";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import Testimonials from "@/components/home/Testimonials";
import EngineeringImpact from "@/components/home/EngineeringImpact";
import Education from "@/components/home/Education";
import Insights from "@/components/home/Insights";
import Contact from "@/components/home/Contact";

/** Homepage: sections in the order defined by the Portfolio 2.0 brief. */
export default function Home() {
  return (
    <>
      <Hero />
      <RecruiterSnapshot />
      <ProfessionalSummary />
      <FeaturedProjects />
      <Expertise />
      <ExperienceTimeline />
      <Testimonials />
      <EngineeringImpact />
      <Education />
      <Insights />
      <Contact />
    </>
  );
}
