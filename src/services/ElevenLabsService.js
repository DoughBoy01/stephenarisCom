import { CONFIG } from '../config.js';

export class ElevenLabsService {
   constructor() {
     this.apiKey = CONFIG.ELEVENLABS.API_KEY;
     this.agentId = CONFIG.ELEVENLABS.AGENT_ID;
     this.client = null;
     this.isInitialized = false;
   }

   async initialize() {
     if (this.isInitialized) return;
     
     try {
       // Load the Convai widget script first
       await this.loadConvaiScript();
       
       // Initialize the client
       const { default: ElevenLabs } = await import('@11labs/client');
       this.client = new ElevenLabs({
         apiKey: this.apiKey
       });
       
       this.isInitialized = true;
     } catch (error) {
       console.error('Failed to initialize 11Labs client:', error);
       this.isInitialized = false;
       throw new Error('Failed to initialize AI service');
     }
   }
   
   loadConvaiScript() {
     return new Promise((resolve, reject) => {
       if (document.querySelector('script[src*="convai-widget"]')) {
         resolve();
         return;
       }
       
       const script = document.createElement('script');
       script.src = "https://elevenlabs.io/convai-widget/index.js";
       script.async = true;
       script.onload = resolve;
       script.onerror = () => reject(new Error('Failed to load Convai widget script'));
       document.head.appendChild(script);
     });
   }
   
   isReady() {
     return this.isInitialized && this.client !== null;
   }
}