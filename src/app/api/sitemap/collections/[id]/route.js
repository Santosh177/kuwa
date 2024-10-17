import { NextResponse } from "next/server";
import { CollectonListSeo } from "@/app/[lng]/(sitemap)/sitemap.xml/route";

  export async function GET(req, { params }) {
    const collectons = await CollectonListSeo();
    const sitemapDataForcollectons = collectons?.map((ele) => {
      return {
        loc: `${process.env.NEXT_WEBSITE_URL}/collections/${ele.seoUrl}`,
        lastmod: ele.lastModified || new Date().toISOString(), // Default to current date if lastModified is unavailable
        changefreq: ele.changefreq || 'daily'
      };
    });

    const pagesSitemapXMLForcollectons = await buildPagesSitemap(sitemapDataForcollectons);
    
    return new NextResponse(pagesSitemapXMLForcollectons, {
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