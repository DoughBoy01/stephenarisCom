import { CONFIG } from '../config.js';
import { TypeWriter } from './TypeWriter.js';

export class ParallaxText {
  constructor() {
    this.currentIndex = 0;
    this.animationDelay = 4000; // Time each section stays visible
    this.sections = [
      {
        sector: 'Government',
        description: 'Led strategic product design and services to GDS standards for Department of Education, Skills Funding Agency, Teacher Services, Ministry of Justice, Department of Health and Social Care, Department for Energy,Security and Net Zero, Surrey County Council.',
        depth: 0.8
      },
      {
        sector: 'Finance',
        description: 'Orchestrated banking services for Nationwide, created new product offer for Trust Bank from Standard Chartered Bank.',
        depth: 0.6
      },
      {
        sector: 'Retail',
        description: "Spearheaded transformation projects for Sainsbury's, House of Fraser, and Waitrose.",
        depth: 0.7
      },
      {
        sector: 'Technology',
        description: 'Projects for Salesforce Inc, a blockchain platform for Job.com and a cyber security messaging and situational awareness system for law enforcement and covert military operations.',
        depth: 0.5
      },
      {
        sector: 'Healthcare',
        description: 'Led innovative telemedicine projects for Amplifon and digital transformations for Bupa.',
        depth: 0.9
      },
      {
        sector: 'Telecoms and utilities',
        description: 'Delivered enterprise and B2B workforce apps for British Telecom, Severn Trent Water and National Grid.',
        depth: 0.4
      },
      {
        sector: 'Automotive',
        description: 'Developed omni-channel customer experiences for Peugeot Citroen and Jaguar Land Rover.',
        depth: 0.7
      },
      {
        sector: 'Media',
        description: 'Digital services for Sky and the BBC.',
        depth: 0.6
      },
    ];

    this.container = this.createContainer();
    this.elements = [];
    this.createSections();
    this.bindEvents();
    this.checkSupport();
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'parallax-container';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    return container;
  }

  createSections() {
    this.sections.forEach((section, index) => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'parallax-section stacked-section';
      sectionEl.style.setProperty('--depth', section.depth);
      sectionEl.style.opacity = index === 0 ? '1' : '0';
      sectionEl.style.transform = 'translateY(0)';
      sectionEl.style.top = `${index * 100}%`;
      
      const sectorEl = document.createElement('h3');
      sectorEl.className = 'sector-title';
      sectorEl.textContent = section.sector;
      
      const descEl = document.createElement('p');
      descEl.className = 'sector-description';
      descEl.textContent = section.description;
      
      sectionEl.appendChild(sectorEl);
      sectionEl.appendChild(descEl);
      this.container.appendChild(sectionEl);
      
      this.elements.push({
        element: sectionEl,
        depth: section.depth,
        initialOffset: index * 150
      });
    });
  }

  bindEvents() {
    this.startAnimation();
  }

  startAnimation() {
    const animate = async () => {
      const currentElement = this.elements[this.currentIndex].element;
      const nextIndex = (this.currentIndex + 1) % this.elements.length;
      const section = this.sections[this.currentIndex];

      // Show current section
      currentElement.style.opacity = '1';
      currentElement.style.transform = 'translateY(0)';

      // Type title and description
      const titleWriter = new TypeWriter(
        currentElement.querySelector('.sector-title'),
        section.sector,
        { delay: 30 }
      );
      
      const descWriter = new TypeWriter(
        currentElement.querySelector('.sector-description'),
        section.description,
        { delay: 15 }
      );

      await titleWriter.type();
      await descWriter.type();

      // Move to next section after delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.currentIndex = nextIndex;
    };

    // Start the animation loop
    const runAnimation = async () => {
      await animate();
      this.animationTimeout = setTimeout(runAnimation, 1000);
    };

    runAnimation();
  }

  checkSupport() {
    if (!window.IntersectionObserver || !window.requestAnimationFrame) {
      this.container.classList.add('no-parallax');
    }
  }

  mount(parent) {
    parent.appendChild(this.container);
    // Show first section immediately
    this.elements[0].element.style.opacity = '1';
    this.elements[0].element.style.transform = 'none';
  }

  unmount() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
}