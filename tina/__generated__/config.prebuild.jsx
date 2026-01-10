// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: "94aef55d-9375-4f06-94d2-3bafc4d1bdf0",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Site Settings",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "site_title",
            label: "Site Title"
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
                  component: "color"
                }
              },
              {
                type: "string",
                name: "gold_accessible",
                label: "Gold Accessible",
                ui: {
                  component: "color"
                }
              },
              {
                type: "string",
                name: "sage",
                label: "Sage",
                ui: {
                  component: "color"
                }
              },
              {
                type: "string",
                name: "cream",
                label: "Cream",
                ui: {
                  component: "color"
                }
              },
              {
                type: "string",
                name: "navy",
                label: "Navy",
                ui: {
                  component: "color"
                }
              }
            ]
          },
          {
            type: "string",
            name: "calendly_url",
            label: "Calendly URL"
          }
        ],
        match: {
          include: "settings"
        }
      },
      {
        name: "home",
        label: "Home Page",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
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
                label: "Eyebrow Text"
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "cta_primary",
                label: "Primary CTA",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text"
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Button Link"
                  }
                ]
              },
              {
                type: "object",
                name: "cta_secondary",
                label: "Secondary CTA",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "problem",
            label: "Problem Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Eyebrow"
              },
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "definition",
                label: "Definition",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "left_badge",
                label: "Left Badge"
              },
              {
                type: "string",
                name: "right_badge",
                label: "Right Badge"
              }
            ]
          },
          {
            type: "object",
            name: "solution",
            label: "Solution Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Eyebrow"
              },
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "lead",
                label: "Lead Text",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "process",
            label: "Process Section",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Eyebrow"
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "cards",
                label: "Process Cards",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Card Title"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Card Text",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "copyright",
                label: "Copyright"
              },
              {
                type: "string",
                name: "disclaimer",
                label: "Disclaimer",
                ui: {
                  component: "textarea"
                }
              }
            ]
          }
        ],
        match: {
          include: "home"
        }
      }
    ]
  }
});
export {
  config_default as default
};
