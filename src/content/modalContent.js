import { projects } from './projects.js';

const modalContent = {
  projects: {
    title: 'Projects',
    content: `<div class="projects-grid"></div>`
  },
  work: {
    title: 'Experience',
    content: `
      <div class="work-content">
        <p class="lead">
          A collection of selected works and projects that showcase my expertise in creative development
          and interactive experiences.
        </p>
        
        <div class="work-grid">
          <div class="work-item">
            <div class="work-item-content">
              <span class="work-date">2023 - Present</span>
              <h3>Senior Creative Developer</h3>
              <p class="work-company">Digital Innovation Studio</p>
              <p class="work-description">
                Led the development of immersive web experiences and interactive installations.
                Specialized in WebGL and Three.js implementations for high-profile clients.
              </p>
              <div class="work-tags">
                <span>Three.js</span>
                <span>WebGL</span>
                <span>Creative Direction</span>
              </div>
            </div>
            <div class="work-item-glow"></div>
          </div>

          <div class="work-item">
            <div class="work-item-content">
              <span class="work-date">2021 - 2023</span>
              <h3>Technical Lead</h3>
              <p class="work-company">Interactive Agency</p>
              <p class="work-description">
                Architected and delivered cutting-edge web applications with focus on performance
                and innovative user experiences.
              </p>
              <div class="work-tags">
                <span>React</span>
                <span>WebGL</span>
                <span>Performance</span>
              </div>
            </div>
            <div class="work-item-glow"></div>
          </div>

          <div class="work-item">
            <div class="work-item-content">
              <span class="work-date">2019 - 2021</span>
              <h3>Creative Developer</h3>
              <p class="work-company">Design Studio</p>
              <p class="work-description">
                Created award-winning interactive experiences and experimental web projects.
                Focused on pushing the boundaries of web technology.
              </p>
              <div class="work-tags">
                <span>Canvas</span>
                <span>Animation</span>
                <span>Interaction</span>
              </div>
            </div>
            <div class="work-item-glow"></div>
          </div>
        </div>
      </div>
    `
  },
  about: {
    title: 'About Me',
    content: `
      <div class="about-content">
        <div class="about-intro">
          <p class="lead">
            I play nicely with others and offer a cross-sector perspective, helping to deliver practical solutions that align with business goals and user needs.
          </p>
        </div>

        <div class="about-cta top">
          <a href="mailto:hello@stephenaris.co.uk?subject=Let's%20Work%20Together&body=Hi%20Stephen%2C%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20potential%20project%20with%20you." class="cta-button">Let's Work Together</a>
        </div>

        <section class="expertise-section">
          <h2 class="section-title" style="text-align: center; color: #fff; margin-bottom: 3rem; font-size: 2rem;">Core Values</h2>
          <div class="expertise-grid">
            <article class="expertise-item">
              <h3>Research & Strategy</h3>
              <ul>
                <li>⌗ Do enough research to have impact.</li>
                <li>⌗ Ask the right questions to the right people.</li>
                <li>⌗ Understand the why.</li>
                <li>⌗ Make sure everyone is aligned and heard.</li>
              </ul>
            </article>
            
            <article class="expertise-item">
              <h3>Design</h3>
              <ul>
                <li>⌗ Think big, what is the art of the possible?</li>
                <li>⌗ Innovate and amplify experience.</li>
                <li>⌗ Design systems not pixels.</li>
                <li>⌗ Prototype, experiment & test.</li>
                <li>⌗ Keep it simple.</li>
              </ul>
            </article>
            
            <article class="expertise-item">
              <h3>Delivery & Impact</h3>
              <ul>
                <li>⌗ Lead as needed, empower teams to value design.</li>
                <li>⌗ Play & coach and sometimes referee.</li>
                <li>⌗ Focus on the customer.</li>
                <li>⌗ Focus on business outcomes.</li>   
                <li>⌗ Focus on delivering value.</li>
                <li>⌗ Play nice, value everyone, have fun!</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="sectors-grid">
          <div class="sector-card">
            <img src="/assets/projects/gov.png" alt="Government sector" class="sector-card-image">
            <div class="sector-card-content">
            <h3>Government</h3>
            <p>Led strategic product design and services to GDS standards for Department of Education, Skills Funding Agency, Teacher Services, Ministry of Justice, Department of Health and Social Care, Department for Energy, Security and Net Zero, Surrey County Council.</p>
            </div>
          </div>
          
          <div class="sector-card">
            <img src="/assets/projects/trust-5.jpg" alt="Finance sector" class="sector-card-image">
            <div class="sector-card-content">
            <h3>Finance</h3>
            <p>Orchestrated banking services for Nationwide, created new product offer for Trust Bank from Standard Chartered Bank.</p>
            </div>
          </div>
          
          <div class="sector-card">
            <img src="/assets/projects/delivery.jpg" alt="Retail sector" class="sector-card-image">
            <div class="sector-card-content">
            <h3>Retail & Logistics</h3>
            <p>Spearheaded transformation projects for Sainsbury's, House of Fraser, and Waitrose.</p>
            </div>
          </div>
          
          <div class="sector-card">
            <img src="/assets/projects/job-2.jpg" alt="Technology sector" class="sector-card-image">
            <div class="sector-card-content">
            <h3>Technology</h3>
            <p>Projects for Salesforce Inc, a blockchain platform for Job.com and a cyber security messaging and situational awareness system for law enforcement and covert military operations.</p>
            </div>
          </div>
          
          <div class="sector-card">
            <img src="/assets/projects/amp.jpg" alt="Healthcare sector" class="sector-card-image">
            <div class="sector-card-content">
            <h3>Healthcare</h3>
            <p>Led innovative telemedicine projects for Amplifon and digital transformations for Bupa.</p>
            </div>
          </div>
          
          <div class="sector-card">
            <img src="/assets/projects/grid-4.jpg" alt="Telecoms sector" class="sector-card-image">
            <div class="sector-card-content">
            <h3>Telecoms and Utilities</h3>
            <p>Delivered enterprise and B2B workforce apps for British Telecom, Severn Trent Water and National Grid.</p>
            </div>
          </div>
        </section>

        <div class="about-cta bottom">
          <a href="mailto:hello@stephenaris.co.uk?subject=Let's%20Work%20Together&body=Hi%20Stephen%2C%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20potential%20project%20with%20you." class="cta-button">Let's Work Together</a>
        </div>
     </div>
    `
  },
  contact: {
    title: 'Contact',
    content: `
      <div class="contact-content">
        <p class="lead">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        
        <div class="about-cta">
          <a href="https://forms.gle/cnYBpUZFkuFgMxot7" target="_blank" rel="noopener noreferrer" class="cta-button">I also love feedback</a>
        </div>
        
        <div class="contact-links">
          <a href="mailto:hello@stephenaris.co.uk?subject=Hello%20Stephen&body=Hi%20Stephen%2C%0D%0A%0D%0A" class="contact-link">
            <span class="icon">✉</span>
            hello@stephenaris.co.uk
          </a>
          
          <a href="https://www.linkedin.com/in/stephenaris/" class="contact-link" target="https://www.linkedin.com/in/stephenaris/">
            <span class="icon">⌘</span>
          Find me on Linkedin
          </a>
               <a href="https://calendly.com/stephenaris/20minute_intro_meeting" class="contact-link" target="https://calendly.com/stephenaris/20minute_intro_meeting/">
            <span class="icon">⌘</span>
         Book a call with a human
          </a>
        </div>
      </div>
    `
  }
};

export default modalContent;