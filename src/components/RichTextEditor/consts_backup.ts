// @ts-strict-ignore
import strikethroughIcon from "@dashboard/icons/StrikethroughIcon";
import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import TextVariantTune from "@editorjs/text-variant-tune";
import Underline from "@editorjs/underline";
import createGenericInlineTool from "editorjs-inline-tool";
import ColorPlugin from "editorjs-text-color-plugin";

const inlineToolbar = ["link", "bold", "italic", "strikethrough", "embed"];

import ImageTool from "@editorjs/image";
// import SimpleImage from "@editorjs/simple-image";

export const tools: Record<string, ToolConstructable | ToolSettings> = {
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    config: {
      defaultLevel: 1,
      levels: [1, 2, 3, 4],
    },
    inlineToolbar: true,
  },
  list: {
    class: List as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar,
  },
  table: {
    class: Table,
    // inlineToolbar,
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
  color: {
    class: ColorPlugin,
    config: {
      colorCollections: [
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
      ],
      type: "text",
      defaultColor: "#EC7878",
      customPicker: true, // add a button to allow selecting any colour
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
