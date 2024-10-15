const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
const { redirect } = require('next/dist/server/api-utils')


  
  // This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
  module.exports = (phase) => {
    console.log("PHASEEE",phase)
    console.log("process.env.NODE_ENV",process.env.NODE_ENV)
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.NODE_ENV === 'qa';

    const isPreProd = phase == PHASE_PRODUCTION_BUILD && process.env.NODE_ENV === "pre-prod"
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.NODE_ENV === 'prod'

  
    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)
  
    const env = {
      BACKEND_END_POINT_URL: isDev?"https://api.kuwa.bevaleo.dev":(isStaging)?'https://api.kuwa.bevaleo.dev':(isPreProd)?"https://falcon.getkuwa.com":(isProd)?"https://falcon.getkuwa.com":"https://api.kuwa.bevaleo.dev",
      BACKEND_END_DJANGO_API_URL:isDev?"https://api.bevaleo.dev":(isStaging)?'https://api.bevaleo.dev':(isPreProd)?"https://bevaleo.me":(isProd)?"https://bevaleo.me":"https://api.bevaleo.dev",
      CLEVER_TAP_FILE_CONFIG:(isProd || isPreProd )?"/clevertap-prod.js":'/clevertap-stage.js',
      NEXT_WEBSITE_URL: isDev?"http://localhost:3000":(isStaging) ? "https://kuwa.bevaleo.dev" :(isPreProd) ? "https://preprod.kuwa.bevaleo.dev" : (isProd) ? "https://bh.getkuwa.com" : "https://kuwa.bevaleo.dev" 
    }
  
    // const headers = [
    //     {
    //       source: "/api/(.*)",
    //       headers: [
    //      { key: "Access-Control-Allow-Credentials", value: "true" },
    //      { key: "Access-Control-Allow-Origin", value: "*" },
    //      { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
    //      { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
    //     ]
    //     }
    //     ]
    // next.config.js object
    
    return {
      async rewrites() {
        return [
          {
            source: "/sitemap_products_:id.xml",
            destination: "/api/sitemap/products/:id", // Correctly mapping for product sitemap
            // permanent: false
          },
          {
            source: "/sitemap_collections_:id.xml",
            destination: "/api/collections/:id", // Correctly mapping for collections sitemap
            // permanent: false
          },
        ];
      },
      experimental: {
        serverActions: true,
      },
      env,
    
    //   headers
    }
  }


