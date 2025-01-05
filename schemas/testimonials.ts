import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: IoChatboxEllipsesOutline,
  fields: [
    defineField({
      name: "name",
      title: "User FullName",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "User Role",
      description:
        "The title of the user eg: CEO of XXX, Developer at YYY, etc",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description:
        "Upload a Profile image for the User. Recommended size 1200 x 750",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "url",
      title: "Social URL",
      type: "url",
    }),
    defineField({
      name: "handle",
      title: "Social Handle",
      description: "The social handle of the user eg: @username",
      type: "string",
    }),
    defineField({
      name: "quotet",
      title: "What the user said",
      type: "text",
    }),
  ],
});
