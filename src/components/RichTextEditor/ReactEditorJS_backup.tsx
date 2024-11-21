import CodeTool from "@editorjs/code";
import EditorJS, { EditorConfig, OutputData } from "@editorjs/editorjs";
import {
  EditorCore,
  Props as ReactEditorJSProps,
  ReactEditorJS as BaseReactEditorJS,
} from "@react-editor-js/core";
import Undo from "editorjs-undo";
import React from "react";

// Source of @react-editor-js
class ClientEditorCore implements EditorCore {
  private readonly _editorJS: EditorJS;

  constructor({ tools, ...config }: EditorConfig) {
    const extendTools = {
      // default tools,
      code: {
        class: CodeTool,
      },
      ...tools,
    };

    this._editorJS = new EditorJS({
      tools: extendTools,
      onReady: () => {
        const undo = new Undo({ editor: this._editorJS });

        undo.initialize({
          shortcuts: {
            undo: "Ctrl+Z",
            redo: "Ctrl+Y",
          },
        });
      },
      ...config,
      i18n: {
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": "Nhấn để tùy chỉnh",
                "or drag to move": "hoặc kéo để di chuyển",
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": "Chuyển đổi sang",
              },
            },
            toolbar: {
              toolbox: {
                Add: "Thêm",
              },
            },
          },
          toolNames: {
            Text: "Văn bản",
            Heading: "Tiêu đề",
            List: "Danh sách",
            Warning: "Cảnh báo",
            Checklist: "Danh sách kiểm tra",
            Quote: "Trích dẫn",
            Code: "Mã",
            Delimiter: "Phân cách",
            Raw: "HTML thô",
            Table: "Bảng",
            Link: "Liên kết",
            Marker: "Đánh dấu",
            Color: "Màu chữ",
            Bold: "Đậm",
            Italic: "Nghiêng",
            InlineCode: "Mã trong dòng",
            Image: "Hình ảnh",
            Underline: "Gạch dưới chữ",
            "Font Size": "Kích thước chữ",
            Strikethrough: "Gạch giữa",
            Style: "Tạo kiểu cho chữ",
          },
          tools: {
            header: {
              "Heading 1": "Tiêu đề 1",
              "Heading 2": "Tiêu đề 2",
              "Heading 3": "Tiêu đề 3",
              "Heading 4": "Tiêu đề 4",
              "Heading 5": "Tiêu đề 5",
              "Heading 6": "Tiêu đề 6",
            },
            warning: {
              Title: "Tiêu đề",
              Message: "Thông báo",
            },
            link: {
              "Add a link": "Thêm liên kết",
            },
            stub: {
              "The block can not be displayed correctly.": "Không thể hiển thị chính xác khối này.",
            },
            image: {
              "Upload image": "Tải ảnh lên",
              "Stretch image": "Căng hình",
              "Select an image": "Chọn hình ảnh",
              "Image URL": "URL hình ảnh",
              Caption: "Chú thích ảnh",
              "With background": "Có nền",
              "With border": "Có viền",
            },
            table: {
              "Add column to left": "Thêm cột bên trái",
              "Add column to right": "Thêm cột bên phải",
              "Delete column": "Xóa cột",
              "Add row above": "Thêm hàng phía trên",
              "Add row below": "Thêm hàng phía dưới",
              "Delete row": "Xóa hàng",
              "With headings": "Có tiêu đề",
              "Without headings": "Không có tiêu đề",
              "Enter cell text": "Nhập văn bản vào ô",
              Heading: "Tiêu đề",
            },
          },
          blockTunes: {
            delete: {
              Delete: "Xóa",
            },
            moveUp: {
              "Move up": "Di chuyển lên",
            },
            moveDown: {
              "Move down": "Di chuyển xuống",
            },
          },
        },
      },
      inlineToolbar: true,
    });
  }

  get dangerouslyLowLevelInstance(): any {
    throw new Error("Method not implemented.");
  }

  public async clear() {
    await this._editorJS.clear();
  }

  public async save() {
    return this._editorJS.save();
  }

  public async destroy() {
    try {
      if (this._editorJS) {
        await this._editorJS.isReady;
        this._editorJS.destroy();
      }
    } catch (e) {
      /*
        Dismiss that error.
        Sometimes instance is already unmounted while Editor wants to destroy it.
        Editorjs does this properly so this error does not break anything
       */
    }
  }

  public async render(data: OutputData) {
    await this._editorJS.render(data);
  }
}

export type Props = Omit<ReactEditorJSProps, "factory">;

function ReactEditorJSClient(props: Props) {
  const factory = React.useCallback((config: EditorConfig) => new ClientEditorCore(config), []);

  return <BaseReactEditorJS factory={factory} {...props} />;
}

export const ReactEditorJS = ReactEditorJSClient;
