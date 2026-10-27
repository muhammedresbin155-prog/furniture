export const GOOGLE_SHEETS_WEB_APP_URL = 
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL || 
  'https://script.google.com/macros/s/AKfycbzXWNeghmfimttM8Gl2-u-_qcKB_vHzbiqgleRJvEEocwboUydzXlbL2-JHK_8QBwVh/exec';

export const GOOGLE_SHEETS_SPREADSHEET_ID = 
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID || 
  '1n1LXXhPDg3rPmOXIKr_rbLw5FipI038HVFZE3f2_1bc';

export const ENDPOINTS = {
  products: `${GOOGLE_SHEETS_WEB_APP_URL}?sheet=products`,
} as const;
