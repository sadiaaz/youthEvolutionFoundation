


import Home from "./home/home";
import { client } from "@/sanity/lib/client";
import { heroBannerQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const heroBanners = await client.fetch(heroBannerQuery);

  return <Home heroBanners={heroBanners} />;
}