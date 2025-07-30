const cloudinary =require('cloudinary').v2


cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

module.exports=cloudinary

// ENV VAR-CLOUDINARY_URL=cloudinary://136977148551418:e1DHAmoNWr0Uo3T13Qp_CCOdhWo@dhxjft7iu