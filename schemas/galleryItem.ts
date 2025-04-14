import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: "contents",
      title: "Contents",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "media",
              title: "Media",
              type: "image",
              options: {
                metadata: ["lqip"],
                hotspot: true,
              },
            },
            {
              name: "caption",
              title: "Caption",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
