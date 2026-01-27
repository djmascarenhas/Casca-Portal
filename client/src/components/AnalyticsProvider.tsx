import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useScrollTracking, useTimeTracking, useAnalytics } from '@/hooks/useAnalytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { trackPageView } = useAnalytics();

  useScrollTracking();
  useTimeTracking();

  useEffect(() => {
    const title = document.title || 'Rio da Casca';
    trackPageView(location, title);
  }, [location, trackPageView]);

  return <>{children}</>;
}
