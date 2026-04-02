import { Timer } from './Timer.js';
import { DockAI } from './dock/DockAI.js';

export class Dock {
  constructor(containerElement = document.body) {
    this.containerElement = containerElement;
    this.clients = [
      'Department of Education',
      'Salesforce',
      'Ministry of Justice',
      'Department of Health',
      'Nationwide',
      'Trust Bank',
      'Sainsburys',
      'House of Fraser',
      'Waitrose',
      'Job.com',
      'Amplifon',
      'Bupa',
      'British Telecom',
      'National Grid',
      'Peugeot Citroen',
      'Jaguar Land Rover',
      'Sky',
      'BBC',
      'Fantasy Interactive',
      'Softwire',
      'Transform',
      'Publicis',
      'Equal Experts',
      'Wipro',
      'Infosys',
      'Surrey County Council'
    ];
    this.ai = new DockAI();
    
    // Detect iOS Safari
    this.isIOSSafari = this.detectIOSSafari();
    
    // Ensure createTopDock method is defined
    this.createTopDock();
    
    this.element = this.createDock();
    this.addEventListeners();
    this.setupResponsiveHandling();
  }

  // Detect iOS Safari
  detectIOSSafari() {
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
    return iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i);
  }

  createTopDock() {
    const topDock = document.createElement('nav');
    topDock.className = 'top-dock';
    topDock.setAttribute('data-items', this.clients.length);
    
    const title = document.createElement('span');
    title.className = 'top-dock-title';
    title.textContent = 'Trusted by:';
    topDock.appendChild(title);
    
    const clientsContainer = document.createElement('div');
    clientsContainer.className = 'top-dock-clients';
    
    const tickerContent = document.createElement('div');
    tickerContent.className = 'ticker-content';
    
    // Add original clients and clone for seamless loop
    this.clients.forEach((client) => {
      const span = document.createElement('span');
      span.className = 'ticker-item';
      span.textContent = client;
      tickerContent.appendChild(span);
    });
    
    // Clone for seamless loop
    this.clients.forEach((client) => {
      const span = document.createElement('span');
      span.className = 'ticker-item';
      span.textContent = client;
      span.setAttribute('data-item', client);
      tickerContent.appendChild(span);
    });
    
    clientsContainer.appendChild(tickerContent);
    topDock.appendChild(clientsContainer);
    document.body.appendChild(topDock);
  }

  createDock() {
    const dock = document.createElement('nav');
    dock.className = 'dock';
    if (this.isIOSSafari) {
      dock.classList.add('ios-safari');
    }
    dock.setAttribute('aria-label', 'Navigation');
    
    const items = [
      { icon: '◇', label: 'Projects', href: '#projects' },
      { icon: '□', label: 'About', href: '#about' },
      { icon: '△', label: 'Contact', href: '#contact' },
      { 
        icon: '♪', 
        label: 'Toggle Ambient',
        href: '#',
        classes: ['dock-audio', 'ambient']
      },
      {
        icon: '🎤︎', 
        label: 'Toggle Radio',
        href: '#',
        classes: ['dock-audio', 'radio']
      }
    ];

    // Add regular items
    items.forEach(item => {
      const link = this.createDockItem(item);
      if (item.classes) {
        link.classList.add(...item.classes);
      }
      dock.appendChild(link);
    });

    // Append to the specified container instead of directly to body
    this.containerElement.appendChild(dock);
    return dock;
  }

  createDockItem({ icon, label, href, class: className }) {
    const link = document.createElement('a');
    link.href = href;
    link.className = 'dock-item';
    link.setAttribute('aria-label', label);

    link.innerHTML = `
      <span class="dock-icon">${icon}</span>
      <span class="dock-label">${label}</span>
    `;

    return link;
  }

  setupResponsiveHandling() {
    const handleResponsive = () => {
      const items = this.element.querySelectorAll('.dock-item');
      const isMobile = window.innerWidth <= 768;
      
      // Ensure the dock is styled to stick to the bottom
      this.element.style.position = 'fixed';
      
      // Base styles for all devices - will be overridden as needed
      this.element.style.width = 'auto';
      this.element.style.maxWidth = isMobile ? '90%' : '90vw';
      this.element.style.left = '50%';
      this.element.style.transform = 'translateX(-50%)';
      this.element.style.padding = isMobile ? '1rem 1.25rem' : '0.75rem 1.5rem';
      this.element.style.justifyContent = 'space-between';
      this.element.style.flexWrap = 'nowrap';
      this.element.style.gap = isMobile ? '0.5rem' : '1.5rem';

      // Special handling for iOS Safari
      if (this.isIOSSafari) {
        this.element.style.bottom = `calc(env(safe-area-inset-bottom, 0) + var(--dock-bottom-spacing))`;
        if (isMobile) {
          this.element.style.maxWidth = '95%';
          this.element.style.padding = '1rem 1rem';
        }
      } else {
        // For non-iOS devices, set bottom to 0 to stick to bottom of screen
        this.element.style.bottom = 'var(--dock-bottom-spacing)';
      }

      // Adjust item sizes based on device type
      items.forEach(item => {
        if (isMobile) {
          // Mobile styles (same for iOS Safari and other mobile browsers)
          item.style.padding = '0.75rem 0.5rem';
          item.style.minWidth = 'auto';
          item.style.flex = '1 1 auto';
        } else {
          // Desktop styles
          item.style.padding = '0.5rem';
          item.style.minWidth = '2.5rem';
          item.style.flex = '0 1 auto';
        }
        
        // Ensure box-sizing is always border-box
        item.style.boxSizing = 'border-box';
      });

      // Adjust icon sizes
      const icons = this.element.querySelectorAll('.dock-icon');
      icons.forEach(icon => {
        icon.style.fontSize = isMobile ? '1.25rem' : '1.5rem';
        icon.style.display = 'block';
        icon.style.textAlign = 'center';
      });

      // Handle timer positioning
      const timer = this.element.querySelector('.dock-timer');
      if (timer) {
        if (isMobile) {
          timer.style.bottom = '-1rem';
          timer.style.fontSize = '0.75rem';
          timer.style.padding = '0.2rem 0.6rem';
        } else {
          timer.style.bottom = '0.1rem';
          timer.style.fontSize = '0.875rem';
          timer.style.padding = '0.25rem 0.75rem';
        }
      }

      // Hover effects for desktop only
      if (!isMobile) {
        items.forEach(item => {
          item.addEventListener('mouseover', () => this.handleItemHover(item));
          item.addEventListener('mouseout', () => this.handleItemOut(item));
        });
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
      } else {
        // Remove hover listeners on mobile
        items.forEach(item => {
          item.removeEventListener('mouseover', () => this.handleItemHover(item));
          item.removeEventListener('mouseout', () => this.handleItemOut(item));
        });
        this.element.removeEventListener('mousemove', this.handleMouseMove.bind(this));
      }
    };

    // Initial setup
    handleResponsive();

    // Responsive handling on resize
    window.addEventListener('resize', handleResponsive);
    
    // Handle orientation changes specifically for iOS Safari
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResponsive, 100); // Small delay to ensure proper calculation after orientation change
    });
    
    // Handle scroll events for iOS Safari to adjust position relative to safe area
    if (this.isIOSSafari) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        // If we're at the bottom of the page
        if (scrollY + viewportHeight >= docHeight - 10) {
          this.element.style.bottom = 'env(safe-area-inset-bottom, 0)';
        } else {
          this.element.style.bottom = 'env(safe-area-inset-bottom, 0)';
        }
      }, { passive: true });
    }
  }

  addEventListeners() {
    const items = this.element.querySelectorAll('.dock-item');
    
    // Click events for all devices
    items.forEach(item => {
      // Add click handler for mobile and desktop
      item.addEventListener('click', (e) => {
        // Prevent default on iOS Safari to avoid double-tap zoom issues
        if (this.isIOSSafari) {
          e.preventDefault();
        }
        
        const href = item.getAttribute('href');
        if (href === '#') return;
        
        if (!item.classList.contains('dock-audio')) {
          e.preventDefault();
          this.handleNavigation(item);
        }
      });
      
      // Add touch events specifically for better mobile response
      if (this.isIOSSafari) {
        item.addEventListener('touchstart', () => {
          item.classList.add('touch-active');
        }, { passive: true });
        
        item.addEventListener('touchend', () => {
          item.classList.remove('touch-active');
        }, { passive: true });
      }
    });

    // Prevent rubber-banding/bouncing on iOS
    this.element.addEventListener('touchmove', (e) => {
      if (this.element.offsetHeight >= this.element.scrollHeight) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  handleItemHover(item) {
    item.classList.add('dock-item-hover');
    const siblings = [...this.element.children];
    siblings.forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.add('dock-item-sibling');
      }
    });
  }

  handleItemOut(item) {
    item.classList.remove('dock-item-hover');
    const siblings = [...this.element.children];
    siblings.forEach(sibling => {
      sibling.classList.remove('dock-item-sibling');
    });
  }

  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Update mouse position for glow effects
    document.documentElement.style.setProperty('--mouse-x', `${(mouseX / rect.width) * 100}%`);
    document.documentElement.style.setProperty('--mouse-y', `${(mouseY / rect.height) * 100}%`);
  }

  handleNavigation(item) {
    const href = item.getAttribute('href');

    if (!href || href === '#') return;

    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}