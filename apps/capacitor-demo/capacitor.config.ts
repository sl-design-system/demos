import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'design.slds.demo',
  appName: 'SLDS Demo',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
  },
};

export default config;
