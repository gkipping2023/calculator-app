export const adSlots = {
  topBanner: '1234567890',
  sidebarRectangle: '0987654321',
  inContent: '1122334455',
  bottomBanner: '5544332211',
  mobileBanner: '9988776655',
} as const;

export type AdSlotKey = keyof typeof adSlots;
