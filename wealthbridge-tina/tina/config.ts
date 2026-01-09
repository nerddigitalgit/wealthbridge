import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Eyebrow Text",
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "cta",
                label: "Call to Action Buttons",
                fields: [
                  {
                    type: "string",
                    name: "primary_text",
                    label: "Primary Button Text",
                  },
                  {
                    type: "string",
                    name: "primary_link",
                    label: "Primary Button Link",
                  },
                  {
                    type: "string",
                    name: "secondary_text",
                    label: "Secondary Button Text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "colors",
            label: "Brand Colors",
            fields: [
              {
                type: "string",
                name: "gold",
                label: "Gold",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                name: "sage",
                label: "Sage Green",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                name: "cream",
                label: "Cream",
                ui: {
                  component: "color",
                },
              },
            ],
          },
          {
            type: "object",
            name: "problem",
            label: "Problem Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "definition",
                label: "Keep Rate Definition",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Process Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Eyebrow Text",
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                list: true,
                name: "cards",
                label: "Process Cards",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Card Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Card Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
