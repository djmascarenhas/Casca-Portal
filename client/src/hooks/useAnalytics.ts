import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
    
    console.log('[Analytics]', event);
  }, []);

  const trackCTA = useCallback((ctaName: string, location: string) => {
    trackEvent({
      category: 'CTA',
      action: 'click',
      label: `${ctaName} - ${location}`,
    });
  }, [trackEvent]);

  const trackScroll = useCallback((depth: number) => {
    trackEvent({
      category: 'Engagement',
      action: 'scroll_depth',
      label: `${depth}%`,
      value: depth,
    });
  }, [trackEvent]);

  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
    
    console.log('[Analytics] Page View:', pagePath, pageTitle);
  }, []);

  const trackNewsletter = useCallback((action: 'submit' | 'success' | 'error') => {
    trackEvent({
      category: 'Newsletter',
      action: action,
      label: 'Footer Newsletter',
    });
  }, [trackEvent]);

  const trackTimeOnPage = useCallback((seconds: number) => {
    trackEvent({
      category: 'Engagement',
      action: 'time_on_page',
      value: seconds,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackCTA,
    trackScroll,
    trackPageView,
    trackNewsletter,
    trackTimeOnPage,
  };
}

export function useScrollTracking() {
  const { trackScroll } = useAnalytics();
  const thresholds = [25, 50, 75, 100];
  const tracked = new Set<number>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackScroll(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScroll]);
}

export function useTimeTracking() {
  const { trackTimeOnPage } = useAnalytics();

  useEffect(() => {
    const startTime = Date.now();
    const intervals = [30, 60, 120, 300];
    const tracked = new Set<number>();

    const checkTime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      
      intervals.forEach((interval) => {
        if (elapsed >= interval && !tracked.has(interval)) {
          tracked.add(interval);
          trackTimeOnPage(interval);
        }
      });
    };

    const intervalId = setInterval(checkTime, 5000);
    
    return () => {
      clearInterval(intervalId);
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      if (totalTime > 5) {
        trackTimeOnPage(totalTime);
      }
    };
  }, [trackTimeOnPage]);
}
