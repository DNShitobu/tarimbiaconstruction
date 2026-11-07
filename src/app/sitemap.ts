import type { MetadataRoute } from "next";

const BASE_URL = "https://www.tarimbiaconstruction.com";

const PATHS = [
  "",
  "/about",
  "/services",
  "/services/building",
  "/services/road",
  "/services/civil-electrical",
  "/services/glazing",
  "/services/consultancy",
  "/services/concrete",
  "/services/facilities",
  "/projects",
  "/awards",
  "/news",
  "/contact",
  "/careers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
