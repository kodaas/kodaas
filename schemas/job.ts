import { BiBriefcase } from "react-icons/bi";
import { defineField } from "sanity";

const job = {
  name: "job",
  title: "Job",
  type: "document",
  icon: BiBriefcase,
  fields: [
    defineField({
      name: "order",
      title: "Oder Number",
      type: "number",
      description:
        "Input a number to order the job. E.g: 1, 2, 3, ... means the first, second, third, ... job.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      description: "What is the name of the company?",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: "Enter the job title. E.g: Software Developer",
      validation: (rule) => rule.required(),
    }),
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
    },
    {
      name: "url",
      title: "Company Website",
      type: "url",
    },
    {
      name: "description",
      title: "Job Description",
      type: "text",
      rows: 3,
      description: "Write a brief description about this role",
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
    },
    {
      name: "achievements",
      title: "Achievements",
      type: "blockContent",
    },
  ],
};

export default job;
