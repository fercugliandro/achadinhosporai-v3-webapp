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
    if (!adRef.current || pushed.current || !window.adsbygoogle) return

    const checkSize = () => {
      const rect = adRef.current?.getBoundingClientRect()
      if (rect && rect.width > 0 && rect.height > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed.current = true
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }
    }

    const timer = setTimeout(checkSize, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={className || ''}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-9806291450823898"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({ });
      </script>
    </div>
  )
}

export default AdUnit
