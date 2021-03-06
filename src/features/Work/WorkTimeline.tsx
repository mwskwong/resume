import React, { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Timeline from "components/Timeline";

const WorkTimeline: FC = () => {
  const { allContentfulWorkingExperience: { nodes: workNodes } } = useStaticQuery<Queries.WorkTimelineQuery>(graphql`
    query WorkTimeline {
      allContentfulWorkingExperience(sort: {order: DESC, fields: from}) {
        nodes {
          from
          to
          jobTitle
          company
          jobDuties
          supportDocuments {
            title
            file {
              publicUrl
            }
            thumbnail {
              gatsbyImage(aspectRatio: 1.5, width: 102)
            }
          }
        }
      }
    }
`);

  const works = workNodes
    .map(({ jobTitle, company, jobDuties, supportDocuments, ...node }) => ({
      title: jobTitle,
      subtitle: company,
      contents: jobDuties,
      supportDocuments: supportDocuments?.map(supportDocument => ({
        title: supportDocument?.title,
        url: supportDocument?.file?.publicUrl,
        thumbnail: supportDocument?.thumbnail?.gatsbyImage
      })),
      ...node
    }));

  return <Timeline data={works} />;
};

if (process.env.NODE_ENV === "development") WorkTimeline.whyDidYouRender = true;

export default WorkTimeline;