export function generateRandomEmail(): string {
  return `user${Date.now()}@test.com`;
}

export function generateRandomString(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function dummyApiCall() {
  // placeholder for future API integration
}