import { NextResponse } from "next/server";
import { ProductListSeo } from "@/app/[lng]/(sitemap)/sitemap.xml/route";

  export async function GET(req, { params }) {
    const products = await ProductListSeo();
  
    const sitemapDataForProducts = products?.map((ele) => {
      return {
        loc: `${process.env.NEXT_WEBSITE_URL}/ar/products/${ele.seoUrl}`,
         lastmod: ele.lastModified || new Date().toISOString(), // Default to current date if lastModified is unavailable
        changefreq: ele.changefreq || 'daily'
      };
    });

    const pagesSitemapXMLForProducts = await buildPagesSitemap(sitemapDataForProducts);
    
    return new NextResponse(pagesSitemapXMLForProducts, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
  
  async function buildPagesSitemap(pages) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';   
  
  
    for (const pageURL of pages) {
      xml += "<url>";
      xml += `<loc>${pageURL.loc}</loc>`;
      xml += `<lastmod>${pageURL.lastmod}</lastmod>`;
      xml += `<changefreq>${pageURL.changefreq}</changefreq>`;
      xml += "</url>";
    }
  
    xml += "</urlset>";
    return xml;
  }