/**
 * Utility functions for handling image URLs
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

/**
 * Converts a relative image path to an absolute URL
 * Handles both stored relative paths and already-absolute URLs
 */
export const getImageUrl = (imagePath: string | undefined): string | undefined => {
  if (!imagePath) return undefined

  // If it's already an absolute URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // If it's a relative path like "/uploads/images/...", prepend the API base URL
  if (imagePath.startsWith('/uploads/')) {
    // Remove the /api suffix if present in API_BASE_URL to get the backend root
    const backendRoot = API_BASE_URL.replace(/\/api.*$/, '')
    return `${backendRoot}${imagePath}`
  }

  // For any other relative path, assume it needs the uploads prefix
  const backendRoot = API_BASE_URL.replace(/\/api.*$/, '')
  return `${backendRoot}/uploads/${imagePath}`
}

/**
 * Transform image URLs in an array of objects
 */
export const transformImageUrls = <T extends Record<string, any>>(
  items: T[],
  imageFields: (keyof T)[]
): T[] => {
  return items.map(item => ({
    ...item,
    ...imageFields.reduce((acc, field) => ({
      ...acc,
      [field]: getImageUrl(item[field] as string),
    }), {}),
  }))
}
