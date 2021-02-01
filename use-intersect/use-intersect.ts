import React, { useEffect, useRef, useState } from 'react'

const thresholdArray = Array.from(Array(100).keys(), i => i / 100)

type StrippedIntersectionObserverEntry = Pick<IntersectionObserverEntry, 'intersectionRatio'>

const IntersectionObserverDefault: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: thresholdArray,
}

export const useIntersect = (options: IntersectionObserverInit = IntersectionObserverDefault):
{
  ref: React.Dispatch < React.SetStateAction < HTMLElement | null >>
  entry: IntersectionObserverEntry | StrippedIntersectionObserverEntry
} => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry | StrippedIntersectionObserverEntry>({ intersectionRatio: 0 })
  const [node, setNode] = useState<HTMLElement | null>(null)

  const observer = useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), options),
  )

  useEffect(
    () => {
      const { current: currentObserver } = observer
      currentObserver.disconnect()

      if (node) currentObserver.observe(node)

      return () => currentObserver.disconnect()
    },
    [node],
  )

  return { ref: setNode, entry }
}
