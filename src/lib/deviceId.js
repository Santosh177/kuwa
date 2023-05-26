import { v4 as uuidv4 } from 'uuid';

export function generateDeviceId() {
  return uuidv4();
}