// @ts-strict-ignore
import strikethroughIcon from "@dashboard/icons/StrikethroughIcon";
import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import TextVariantTune from "@editorjs/text-variant-tune";
import Underline from "@editorjs/underline";
import FontSizeTool from "editorjs-inline-font-size-tool";
import createGenericInlineTool from "editorjs-inline-tool";
import { StyleInlineTool } from "editorjs-style";
import ColorPlugin from "editorjs-text-color-plugin";
// const inlineToolbar = ["link", "bold", "italic", "strikethrough", "embed"];

const colorList = [
  "#EC7878",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#0070FF",
  "#03A9F4",
  "#00BCD4",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFF",
];

export const tools: Record<string, ToolConstructable | ToolSettings> = {
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    config: {
      defaultLevel: 1,
      levels: [1, 2, 3, 4, 5, 6],
    },
    inlineToolbar: true,
  },
  fontSize: {
    class: FontSizeTool,
  },
  list: {
    class: List as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    tunes: ["backgroundColorTune"],
  },
  table: {
    class: Table,
    inlineToolbar: true,
  } as unknown as ToolConstructable,
  textVariant: {
    class: TextVariantTune,
    inlineToolbar: true,
  },
  raw: RawTool,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: file => {
          const formData = new FormData();

          formData.append("file", file);

          const urlUpload =
            "https://api.cloudinary.com/v1_1/dntus9abj/image/upload?upload_preset=editorjs_product";

          return fetch(urlUpload, {
            method: "POST",
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              return {
                success: 1,
                file: {
                  url: data.secure_url,
                },
              };
            });
        },
      },
    },
  },
  style: {
    class: StyleInlineTool,
  },
  color: {
    class: ColorPlugin,
    config: {
      colorCollections: colorList,
      type: "text",
      defaultColor: "#EC7878",
      customPicker: true,
    },
  },
  marker: {
    class: ColorPlugin,
    config: {
      defaultColor: "#FFBF00",
      type: "marker",
      colorCollections: colorList,
      icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
    },
  },
  underline: Underline,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  } as unknown as ToolConstructable,
  strikethrough: createGenericInlineTool({
    sanitize: {
      s: {},
    },
    shortcut: "CMD+S",
    tagName: "s",
    toolboxIcon: strikethroughIcon,
  }),
};
