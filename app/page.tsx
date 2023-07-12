import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import Education from "@/components/home/education";
import Experience from "@/components/home/experience";
import FunFact from "@/components/home/fun-fact";
import Hero from "@/components/home/hero";
import SectionDivider from "@/components/section-divider";
import {
  getCourses,
  getEducations,
  getExperiences,
  getPersonalPhoto,
  getSkillCategories,
} from "@/lib";

const bgcolors = {
  hero: undefined,
  about: "background.level1",
  funFact: "primary.solidBg",
  experience: undefined,
  education: "background.level1",
  contact: undefined,
};

const Home = async () => {
  const [personalPhoto, skillCategories, experiences, educations, courses] =
    await Promise.all([
      getPersonalPhoto(),
      getSkillCategories(),
      getExperiences(),
      getEducations(),
      getCourses(),
    ]);

  return (
    <>
      <Hero sx={{ bgcolor: bgcolors.hero }} />
      <SectionDivider sx={{ color: bgcolors.hero, bgcolor: bgcolors.about }} />
      <About
        sx={{ bgcolor: bgcolors.about }}
        personalPhoto={personalPhoto}
        skillCategories={skillCategories}
      />
      <SectionDivider
        sx={{ color: bgcolors.about, bgcolor: bgcolors.funFact }}
      />
      <FunFact />
      <SectionDivider
        sx={{ color: bgcolors.funFact, bgcolor: bgcolors.experience }}
      />
      <Experience
        sx={{ bgcolor: bgcolors.experience }}
        experiences={experiences}
      />
      <SectionDivider
        sx={{ color: bgcolors.experience, bgcolor: bgcolors.education }}
      />
      <Education
        sx={{ bgcolor: bgcolors.education }}
        educations={educations}
        courses={courses}
      />
      <SectionDivider
        sx={{ color: bgcolors.education, bgcolor: bgcolors.contact }}
      />
      <Contact sx={{ bgcolor: bgcolors.contact }} />
    </>
  );
};

export default Home;
