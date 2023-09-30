const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')


  
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
      BACKEND_END_POINT_URL: isDev?"https://api.kuwa.bevaleo.dev":(isStaging)?'https://api.kuwa.bevaleo.dev/stage':(isPreProd)?"https://api.kuwa.bevaleo.dev/pre-prod":(isProd)?"https://api.kuwa.bevaleo.dev/prod":"https://api.kuwa.bevaleo.dev/ass"
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
      env,
    //   headers
    }
  }


