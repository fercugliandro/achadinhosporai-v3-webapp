import { AMAZON_TAG } from './config'

export function getAffiliateUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    urlObj.searchParams.set('tag', AMAZON_TAG)
    return urlObj.toString()
  } catch {
    return url
  }
}

export function getShortUrl(id: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}/go/${id}`
}
