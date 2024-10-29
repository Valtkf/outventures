import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "4du27trl",
  dataset: "production",
  apiVersion: "2023-09-19",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: { _type: string; asset: { _ref: string } }) {
  return builder.image(source);
}
