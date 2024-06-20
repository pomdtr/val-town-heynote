import dir from "./embed/static/dir.ts";
import mime from "npm:mime@^4.0.3";

export async function handler(req: Request): Promise<Response> {
  let { pathname } = new URL(req.url);
  if (pathname.endsWith("/")) {
    pathname += "index.html";
  }

  const content = await dir.get(pathname.slice(1));
  if (!content) {
    return new Response("Not found", { status: 404 });
  }

  const mimeType = mime.getType(pathname);
  if (!mimeType) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(await content.bytes(), {
    headers: {
      "content-type": mimeType,
    },
  });
}

export default {
  fetch: handler,
};
