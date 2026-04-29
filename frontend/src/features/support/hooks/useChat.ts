import { useRef, useEffect } from 'react';

export function useChatScroll(deps: unknown[]) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return bottomRef;
}