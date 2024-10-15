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

   const collections = [
    {
      id:100,
      seoUrl:"valeo"
    },
    {
      id:101,
      seoUrl:"kuwa"
    },
    {
      id:102,
      seoUrl:"feelvaleo"
    },
    {
      id:103,
      seoUrl:"aadar"
    }
   ]

export async function generateSitemaps() {
    // Fetch the total number of products and calculate the number of sitemaps needed

    const totalProducts = products.length;
    const productsPerSitemapSize = 2; // Adjust this value based on your needs
    const sitemapsCountForProducts = Math.ceil(totalProducts / productsPerSitemapSize);

    const totalCollections = collections.length;
    const collectionsPerSitemapSize = 2; // Adjust this value based on your needs
    const sitemapsCountForCollections = Math.ceil(totalCollections / collectionsPerSitemapSize);

    const sitemapsForProducts = Array.from({length: sitemapsCountForProducts},(_, index) => (
        {
            id:index,
            url: `${process.env.NEXT_WEBSITE_URL}/sitemap_products_${index}.xml`
        }
    ))

    const sitemapsForCollections = Array.from({length: sitemapsCountForCollections},(_, index) => (
      {
        id:index,
        url: `${process.env.NEXT_WEBSITE_URL}/sitemap_collections_${index}.xml`
      }
    ))
  
   return {
    sitemapsForProducts,
    sitemapsForCollections
   }
  }

  export async function GET(){
    try{

        const dynamicSiteMaps = await generateSitemaps();
        const { sitemapsForProducts, sitemapsForCollections } = dynamicSiteMaps;
        const sitemaps = [
          ...sitemapsForProducts.map(sitemap => sitemap.url),
          ...sitemapsForCollections.map(sitemap => sitemap.url),
          `${process.env.NEXT_WEBSITE_URL}/blog.xml`,
         

        ]

        console.log("generated sitemaps",dynamicSiteMaps)

        const sitemapIndexXml = await buildSitemapIndexXml(sitemaps);
        return new NextResponse(sitemapIndexXml, {
            headers: {
                'Content-Type': 'application/xml',
                'Content-Length': Buffer.byteLength(sitemapIndexXml).toString() 
            },
        })

    }
    catch(error){
        console.log("fetching Error",error);
        return  NextResponse.error();
    }
  }

  async function buildSitemapIndexXml(sitemaps){
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    for(const sitemapUrls of sitemaps){
        xml += `<sitemap><loc>${sitemapUrls}</loc></sitemap>`;
    }
    xml += '</sitemapindex>';
    return xml;
  }