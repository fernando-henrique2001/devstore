import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    cache: "no-store",
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  return await response.json();
}

// Image generation
export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  const productImageUrl = new URL(
    product.image,
    process.env.APP_URL
  ).toString();

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          backgroundColor: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={productImageUrl} style={{ width: "100%" }} alt="" />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
