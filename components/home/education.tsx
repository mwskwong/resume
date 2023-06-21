import { BoxProps } from "@mui/joy";

import { getCourses, getEducations } from "@/lib";

import EducationClient from "./education-client";

const Education = async (props: BoxProps<"section">) => {
  const [educations, courses] = await Promise.all([
    getEducations(),
    getCourses(),
  ]);

  return (
    <EducationClient educations={educations} courses={courses} {...props} />
  );
};

export default Education;
