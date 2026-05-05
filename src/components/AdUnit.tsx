import { useEffect, useRef } from 'react'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

function AdUnit({ adSlot, adFormat = 'auto', style, className }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (adRef.current && !pushed.current && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({})
        pushed.current = true
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [])

  return (
    <div className={`ad-container ${className || ''}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-9806291450823898"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdUnit
