import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ocr-pur.vercel.app'
    const currentDate = new Date()

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Note: Fragment URLs (#features, #api) are not indexed by Google
        // If you want these sections indexed, create separate pages like /features, /api-docs
    ]
}
