/**
 * Google Street View Integration for DarrylBots
 * Displays street view of business location
 */

class StreetViewManager {
  constructor() {
    // API key should be set in environment or config
    this.apiKey = this.getApiKey();
    this.defaultLocation = '520 Edinburgh Circle, Danville, CA 94526';
    this.imageSize = '600x300';
    this.heading = 45; // Optimal angle for the house
    this.pitch = 0;
    this.fov = 90;
  }

  /**
   * Get Google API key from various sources
   */
  getApiKey() {
    // Try environment variable first
    if (typeof process !== 'undefined' && process.env && process.env.GOOGLE_API_KEY) {
      return process.env.GOOGLE_API_KEY;
    }
    
    // Try global config object
    if (typeof window !== 'undefined' && window.GOOGLE_API_KEY) {
      return window.GOOGLE_API_KEY;
    }
    
    // Return placeholder - user needs to set this
    return 'YOUR_GOOGLE_API_KEY_HERE';
  }

  /**
   * Generate Street View Static API URL
   */
  generateStreetViewUrl(location = null, options = {}) {
    const loc = location || this.defaultLocation;
    const size = options.size || this.imageSize;
    const heading = options.heading || this.heading;
    const pitch = options.pitch || this.pitch;
    const fov = options.fov || this.fov;

    const params = new URLSearchParams({
      size: size,
      location: loc,
      heading: heading,
      pitch: pitch,
      fov: fov,
      key: this.apiKey
    });

    return `https://maps.googleapis.com/maps/api/streetview?${params.toString()}`;
  }

  /**
   * Create Street View image element
   */
  createStreetViewImage(container, location = null, options = {}) {
    if (!container) {
      console.error('StreetView: Container element not found');
      return null;
    }

    const img = document.createElement('img');
    img.src = this.generateStreetViewUrl(location, options);
    img.alt = `Street View of ${location || this.defaultLocation}`;
    img.style.cssText = `
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    `;

    // Add loading state
    img.onload = () => {
      img.style.opacity = '1';
      console.log('Street View image loaded successfully');
    };

    img.onerror = () => {
      console.error('Failed to load Street View image');
      this.showFallback(container, location);
    };

    // Clear container and add image
    container.innerHTML = '';
    container.appendChild(img);

    return img;
  }

  /**
   * Show fallback when Street View fails
   */
  showFallback(container, location) {
    container.innerHTML = `
      <div style="
        width: 100%;
        height: 300px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
        font-family: 'Inter', sans-serif;
      ">
        <div>
          <div style="font-size: 3rem; margin-bottom: 1rem;">🏠</div>
          <div style="font-size: 1.2rem; font-weight: 600;">Located in Danville, CA</div>
          <div style="opacity: 0.8; margin-top: 0.5rem;">Your neighborhood robot specialists</div>
        </div>
      </div>
    `;
  }

  /**
   * Initialize Street View on page load
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initStreetView());
    } else {
      this.initStreetView();
    }
  }

  /**
   * Initialize Street View elements
   */
  initStreetView() {
    // Find all Street View containers
    const containers = document.querySelectorAll('.streetview-container');
    
    containers.forEach((container, index) => {
      const location = container.dataset.location || this.defaultLocation;
      const size = container.dataset.size || this.imageSize;
      const heading = parseInt(container.dataset.heading) || this.heading;
      
      this.createStreetViewImage(container, location, {
        size,
        heading,
        pitch: this.pitch,
        fov: this.fov
      });
    });

    // Log initialization
    if (containers.length > 0) {
      console.log(`🗺️ Street View initialized for ${containers.length} container(s)`);
    }
  }

  /**
   * Update API key (for dynamic configuration)
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    console.log('🔑 Google API key updated');
    // Re-initialize to reload images with new key
    this.initStreetView();
  }

  /**
   * Get configuration info
   */
  getConfig() {
    return {
      apiKey: this.apiKey.replace(/./g, '*'), // Hide key
      defaultLocation: this.defaultLocation,
      imageSize: this.imageSize,
      heading: this.heading,
      pitch: this.pitch,
      fov: this.fov
    };
  }
}

// Create global instance
window.streetViewManager = new StreetViewManager();

// Auto-initialize if not in module environment
if (typeof module === 'undefined') {
  window.streetViewManager.init();
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StreetViewManager;
}