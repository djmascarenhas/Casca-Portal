/**
 * GoFullPage - Analytics Tracking Script
 * Versão: 1.0
 * Rastreamento de eventos e métricas de otimização
 */

(function() {
  'use strict';

  // ==========================================
  // CONFIGURAÇÃO
  // ==========================================
  
  const config = {
    // Google Analytics Tracking ID
    gaTrackingId: 'UA-XXXXXXXXX-X', // Substituir pelo ID real
    
    // Eventos para rastrear
    trackEvents: {
      heroCTA: true,
      featuredCards: true,
      categoryClicks: true,
      timelineFilters: true,
      newsletter: true,
      scrollDepth: true,
      readingTime: true,
      outboundLinks: true
    },
    
    // Profundidades de scroll para rastrear (%)
    scrollDepths: [25, 50, 75, 100],
    
    // Tempo para considerar "leitura engajada" (segundos)
    engagedReadingTime: 30
  };

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================
  
  let scrollTracked = [];
  let startTime = Date.now();
  let engagementLogged = false;
  
  // Verificar se Google Analytics está carregado
  function isGALoaded() {
    return typeof gtag !== 'undefined' || typeof ga !== 'undefined';
  }
  
  // Função wrapper para enviar eventos
  function trackEvent(category, action, label, value) {
    if (!isGALoaded()) {
      console.log('[Analytics Debug]', category, action, label, value);
      return;
    }
    
    // Google Analytics 4 (gtag)
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }
    
    // Universal Analytics (ga)
    if (typeof ga !== 'undefined') {
      ga('send', 'event', category, action, label, value);
    }
  }

  // ==========================================
  // HERO CTA TRACKING
  // ==========================================
  
  function trackHeroCTA() {
    const heroCTA = document.querySelector('.hero-cta');
    
    if (heroCTA && config.trackEvents.heroCTA) {
      heroCTA.addEventListener('click', function(e) {
        trackEvent('engagement', 'hero_cta_click', 'explore_stories');
        
        // Rastrear também como conversão
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            'send_to': config.gaTrackingId,
            'event_category': 'cta_interaction',
            'event_label': 'hero_primary'
          });
        }
      });
    }
  }

  // ==========================================
  // FEATURED ARTICLES TRACKING
  // ==========================================
  
  function trackFeaturedCards() {
    const featuredCards = document.querySelectorAll('.featured-card .cta-primary');
    
    if (featuredCards.length > 0 && config.trackEvents.featuredCards) {
      featuredCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
          const cardElement = this.closest('.featured-card');
          const title = cardElement.querySelector('.card-title')?.textContent.trim() || 'Unknown';
          const category = cardElement.querySelector('.card-meta')?.textContent.trim() || 'Uncategorized';
          
          trackEvent('engagement', 'featured_article_click', title, index + 1);
          
          // Dados adicionais para análise
          if (typeof gtag !== 'undefined') {
            gtag('event', 'article_interaction', {
              'article_title': title,
              'article_position': index + 1,
              'article_category': category,
              'interaction_type': 'featured_card'
            });
          }
        });
      });
    }
  }

  // ==========================================
  // CATEGORY NAVIGATION TRACKING
  // ==========================================
  
  function trackCategoryClicks() {
    const categoryLinks = document.querySelectorAll('.category-list a');
    
    if (categoryLinks.length > 0 && config.trackEvents.categoryClicks) {
      categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const category = this.textContent.trim();
          const icon = this.querySelector('.cat-icon')?.textContent || '';
          
          trackEvent('navigation', 'category_click', category);
          
          // Rastrear padrões de navegação
          if (typeof gtag !== 'undefined') {
            gtag('event', 'category_navigation', {
              'category_name': category,
              'category_icon': icon,
              'navigation_source': 'sidebar'
            });
          }
        });
      });
    }
  }

  // ==========================================
  // TIMELINE FILTERS TRACKING
  // ==========================================
  
  function trackTimelineFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (filterBtns.length > 0 && config.trackEvents.timelineFilters) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          const filter = this.getAttribute('data-filter') || this.textContent.trim();
          
          trackEvent('interaction', 'timeline_filter', filter);
          
          // Rastrear uso de filtros
          if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_usage', {
              'filter_type': 'timeline',
              'filter_value': filter
            });
          }
        });
      });
    }
  }

  // ==========================================
  // NEWSLETTER SIGNUP TRACKING
  // ==========================================
  
  function trackNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form, .newsletter-form-footer');
    
    if (forms.length > 0 && config.trackEvents.newsletter) {
      forms.forEach(form => {
        form.addEventListener('submit', function(e) {
          const formId = this.id || this.className;
          const location = formId.includes('footer') ? 'footer' : 'sidebar';
          
          trackEvent('conversion', 'newsletter_signup', location);
          
          // Rastrear como objetivo de conversão
          if (typeof gtag !== 'undefined') {
            gtag('event', 'sign_up', {
              'method': 'email',
              'location': location
            });
          }
          
          // Facebook Pixel (se disponível)
          if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
              content_name: 'Newsletter Signup',
              content_category: location
            });
          }
        });
      });
    }
  }

  // ==========================================
  // SCROLL DEPTH TRACKING
  // ==========================================
  
  function trackScrollDepth() {
    if (!config.trackEvents.scrollDepth) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
          
          config.scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
              scrollTracked.push(depth);
              trackEvent('engagement', 'scroll_depth', depth + '%', depth);
              
              // Rastrear marcos importantes
              if (depth === 100) {
                trackEvent('engagement', 'page_completion', window.location.pathname);
              }
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }

  // ==========================================
  // READING TIME TRACKING
  // ==========================================
  
  function trackReadingTime() {
    if (!config.trackEvents.readingTime) return;
    
    // Verificar tempo de leitura engajada
    setTimeout(function() {
      if (!engagementLogged) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (timeSpent >= config.engagedReadingTime) {
          trackEvent('engagement', 'engaged_reading', window.location.pathname, timeSpent);
          engagementLogged = true;
        }
      }
    }, config.engagedReadingTime * 1000);
    
    // Rastrear quando usuário sai da página
    window.addEventListener('beforeunload', function() {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (timeSpent > 5) { // Mínimo de 5 segundos
        trackEvent('engagement', 'time_on_page', window.location.pathname, timeSpent);
        
        // Categorizar tempo
        let timeCategory;
        if (timeSpent < 30) timeCategory = '0-30s';
        else if (timeSpent < 60) timeCategory = '30-60s';
        else if (timeSpent < 120) timeCategory = '1-2min';
        else if (timeSpent < 300) timeCategory = '2-5min';
        else timeCategory = '5min+';
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'reading_time', {
            'time_category': timeCategory,
            'time_seconds': timeSpent,
            'page_path': window.location.pathname
          });
        }
      }
    });
  }

  // ==========================================
  // OUTBOUND LINKS TRACKING
  // ==========================================
  
  function trackOutboundLinks() {
    if (!config.trackEvents.outboundLinks) return;
    
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      
      if (link && link.hostname !== window.location.hostname) {
        const url = link.href;
        const text = link.textContent.trim();
        
        trackEvent('navigation', 'outbound_link', url);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            'event_category': 'outbound',
            'event_label': url,
            'link_text': text
          });
        }
      }
    });
  }

  // ==========================================
  // POPULAR POSTS TRACKING
  // ==========================================
  
  function trackPopularPosts() {
    const popularLinks = document.querySelectorAll('.popular-list a');
    
    if (popularLinks.length > 0) {
      popularLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
          const title = this.textContent.trim();
          const position = index + 1;
          
          trackEvent('engagement', 'popular_post_click', title, position);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'popular_content_click', {
              'content_title': title,
              'content_position': position,
              'widget_location': 'sidebar'
            });
          }
        });
      });
    }
  }

  // ==========================================
  // ARTICLE CTA TRACKING (TODOS OS CTAs)
  // ==========================================
  
  function trackAllCTAs() {
    const allCTAs = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    allCTAs.forEach(cta => {
      cta.addEventListener('click', function(e) {
        const text = this.textContent.trim();
        const type = this.classList.contains('cta-primary') ? 'primary' : 'secondary';
        const section = this.closest('section')?.className || 'unknown';
        
        trackEvent('engagement', 'cta_click', text);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cta_interaction', {
            'cta_text': text,
            'cta_type': type,
            'cta_section': section
          });
        }
      });
    });
  }

  // ==========================================
  // ERROR TRACKING
  // ==========================================
  
  function trackErrors() {
    // JavaScript errors
    window.addEventListener('error', function(e) {
      trackEvent('error', 'javascript_error', e.message, e.lineno);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          'description': e.message,
          'fatal': false
        });
      }
    });
    
    // 404 detection
    if (document.title.includes('404') || document.body.textContent.includes('Página não encontrada')) {
      trackEvent('error', '404_page', window.location.pathname);
    }
  }

  // ==========================================
  // PERFORMANCE TRACKING
  // ==========================================
  
  function trackPerformance() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver(function(list) {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          trackEvent('performance', 'lcp', 'largest_contentful_paint', Math.round(lastEntry.startTime));
        });
        lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
      } catch (e) {
        console.log('LCP tracking not supported');
      }
      
      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver(function(list) {
          const entries = list.getEntries();
          entries.forEach(entry => {
            trackEvent('performance', 'fid', 'first_input_delay', Math.round(entry.processingStart - entry.startTime));
          });
        });
        fidObserver.observe({entryTypes: ['first-input']});
      } catch (e) {
        console.log('FID tracking not supported');
      }
    }
    
    // Page Load Time
    window.addEventListener('load', function() {
      setTimeout(function() {
        if (window.performance && window.performance.timing) {
          const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
          trackEvent('performance', 'page_load', 'load_time', Math.round(loadTime));
        }
      }, 0);
    });
  }

  // ==========================================
  // CUSTOM DIMENSIONS
  // ==========================================
  
  function setCustomDimensions() {
    if (typeof gtag === 'undefined') return;
    
    // Device type
    const deviceType = window.innerWidth < 768 ? 'mobile' : 
                       window.innerWidth < 1024 ? 'tablet' : 'desktop';
    
    gtag('set', {
      'dimension1': deviceType,
      'dimension2': navigator.userAgent,
      'dimension3': document.referrer || 'direct'
    });
  }

  // ==========================================
  // INICIALIZAÇÃO DE TODOS OS RASTREAMENTOS
  // ==========================================
  
  function initTracking() {
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        startTracking();
      });
    } else {
      startTracking();
    }
  }
  
  function startTracking() {
    console.log('[GoFullPage Analytics] Initializing tracking...');
    
    // Custom dimensions
    setCustomDimensions();
    
    // Rastreamento de interações
    trackHeroCTA();
    trackFeaturedCards();
    trackCategoryClicks();
    trackTimelineFilters();
    trackNewsletter();
    trackPopularPosts();
    trackAllCTAs();
    
    // Rastreamento de comportamento
    trackScrollDepth();
    trackReadingTime();
    trackOutboundLinks();
    
    // Rastreamento de qualidade
    trackErrors();
    trackPerformance();
    
    console.log('[GoFullPage Analytics] Tracking initialized successfully');
  }

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  window.GoFullPageAnalytics = {
    version: '1.0',
    config: config,
    trackEvent: trackEvent,
    init: initTracking
  };
  
  // Auto-inicializar
  initTracking();

})();

/**
 * INSTRUÇÕES DE USO:
 * 
 * 1. Adicionar este script após o Google Analytics no HTML:
 *    <script src="analytics_tracking.js"></script>
 * 
 * 2. Configurar o Tracking ID no início do arquivo
 * 
 * 3. Para rastrear eventos customizados:
 *    GoFullPageAnalytics.trackEvent('categoria', 'acao', 'label', valor);
 * 
 * 4. Para desabilitar algum rastreamento, editar config.trackEvents
 * 
 * 5. Ver console do browser para debug (modo desenvolvimento)
 */
