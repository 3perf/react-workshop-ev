import { remark } from "remark";
import remarkGfm from "remark-gfm";

export async function convertMarkdownToHtml(text) {
  const file = await remark().use(remarkGfm).process(text);

  return String(file);
}
