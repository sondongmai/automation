const {join} = require("path");

export class HelperActions {
  getFullPath(relativePath: string) {
    return join(process.cwd(), relativePath);
  }
}

export const enum ContentType {
  video = "Upload Video",
  short = "Upload Shorts",
  article = "Add Article",
}
