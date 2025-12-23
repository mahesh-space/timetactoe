import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'timetactoe',
  // Vite outputs production assets to "dist", not "build"
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
