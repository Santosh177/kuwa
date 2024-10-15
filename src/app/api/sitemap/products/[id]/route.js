import { NextResponse } from "next/server";
const products = [
  {
    id:100,
    seoUrl:"product1_seo"
  },
  {
    id:101,
    seoUrl:"product2_seo"
  },
  {
    id:102,
    seoUrl:"product3_seo"
  },
  {
    id:103,
    seoUrl:"product3_seo"
  }
 ]

  export async function GET(req, { params }) {
    console.log("sitemap-Params", params);
   
    const sitemapDataForProducts = products?.map((ele) => {
      return {
        loc: `${process.env.NEXT_WEBSITE_URL}/${ele.seoUrl}`,
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
      xml += "</url>";
    }
  
    xml += "</urlset>";
    return xml;
  }