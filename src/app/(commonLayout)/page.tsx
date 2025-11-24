import { Hero } from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialities";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonial";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctor";


const HomePage = () => {
  return (
    <>
      <Hero />
      <Specialities />
      <Steps />
      <Testimonials />
      <TopRatedDoctors />
    </>
  );
};

export default HomePage;
