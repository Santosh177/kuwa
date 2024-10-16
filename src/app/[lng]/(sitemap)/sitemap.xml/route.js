import { NextResponse } from "next/server";
import { authHeader } from "@/lib/auth-cookies";

export async function ProductListSeo() {
  const customHeader = await authHeader();
  const getActiveProducts = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/getActiveProductList`, {
    method: 'GET',
    headers: { ...customHeader },
    cache: 'no-store',
  });
  const data = await getActiveProducts.json();
  return data;
}

export async function CollectonListSeo() {
    const customHeader = await authHeader();
    const getActiveProducts = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/collection/details`, {
      method: 'GET',
      headers: { ...customHeader },
      cache: 'no-store',
    });
    const data = await getActiveProducts.json();
    return data;
  }


export async function generateSitemaps() {
  // Fetch product list
  const products = await ProductListSeo(); // Await the async product list
  if (!products || !products.length) {
    throw new Error("No products found");
  }
  const collections = await CollectonListSeo();

  // Calculate number of sitemaps for products
  const totalProducts = products.length;
  const productsPerSitemapSize = 2500; // Adjust this value based on your needs
  const sitemapsCountForProducts = Math.ceil(totalProducts / productsPerSitemapSize);

  // Calculate number of sitemaps for collections
  const totalCollections = collections.length;
  const collectionsPerSitemapSize = 310; // Adjust this value based on your needs
  const sitemapsCountForCollections = Math.ceil(totalCollections / collectionsPerSitemapSize);

  // Generate product sitemap URLs
  const sitemapsForProducts = Array.from({ length: sitemapsCountForProducts }, (_, index) => ({
    id: index,
    url: `${process.env.NEXT_WEBSITE_URL}/sitemap_products_${index}.xml`,
  }));

  // Generate collection sitemap URLs
  const sitemapsForCollections = Array.from({ length: sitemapsCountForCollections }, (_, index) => ({
    id: index,
    url: `${process.env.NEXT_WEBSITE_URL}/sitemap_collections_${index}.xml`,
  }));

  return {
    sitemapsForProducts,
    sitemapsForCollections,
  };
}

export async function GET() {
  try {
    // Generate dynamic sitemaps
    const dynamicSiteMaps = await generateSitemaps();
    const { sitemapsForProducts, sitemapsForCollections } = dynamicSiteMaps;

    // Create a list of all sitemap URLs
    const sitemaps = [
      ...sitemapsForProducts.map((sitemap) => sitemap.url),
      ...sitemapsForCollections.map((sitemap) => sitemap.url),
      `${process.env.NEXT_WEBSITE_URL}/blog.xml`,
    ];

    console.log("Generated sitemaps", dynamicSiteMaps);

    // Build the sitemap index XML
    const sitemapIndexXml = await buildSitemapIndexXml(sitemaps);

    // Return XML response with correct headers
    return new NextResponse(sitemapIndexXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Length': Buffer.byteLength(sitemapIndexXml).toString(),
      },
    });
  } catch (error) {
    console.log("Fetching Error", error);
    return NextResponse.error();
  }
}

// Helper function to build the XML content
async function buildSitemapIndexXml(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  for (const sitemapUrl of sitemaps) {
    xml += `<sitemap><loc>${sitemapUrl}</loc></sitemap>`;
  }

  xml += '</sitemapindex>';
  return xml;
}
