/**
 * Configuration for DarrylBots website
 * Set your API keys and other config here
 */

// Google API Configuration
// Get your API key from: https://console.cloud.google.com/apis/credentials
window.GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY_HERE';

// To set up your Google API key:
// 1. Go to https://console.cloud.google.com/apis/credentials
// 2. Create or select your project
// 3. Create an API key or use existing one
// 4. Enable these APIs:
//    - Street View Static API
//    - Maps JavaScript API
//    - Geocoding API (optional)
// 5. Replace 'YOUR_GOOGLE_API_KEY_HERE' above with your actual key

// Development mode - shows helpful messages
window.DARRYLBOTS_DEBUG = true;

// Business Information
window.BUSINESS_CONFIG = {
  name: 'DarrylBots',
  address: 'East Bay Area, CA',
  phone: '',
  email: 'hello@darrylbots.com',
  serviceArea: 'East Bay Area, San Francisco Bay Area',
  openingYear: 2027,
  tagline: 'Your neighborhood robot specialists'
};

console.log('🤖 DarrylBots configuration loaded');
if (window.DARRYLBOTS_DEBUG) {
  console.log('📍 Service area:', window.BUSINESS_CONFIG.serviceArea);
  console.log('🔑 Google API key configured:', 
    window.GOOGLE_API_KEY !== 'YOUR_GOOGLE_API_KEY_HERE' ? '✅ Yes' : '❌ No - Please set your API key');
}
