const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Device {
  id: number;
  device_id: string;
  name: string;
  status: "online" | "offline";
  last_seen: string | null;
  created_at: string;
  updated_at: string;
}

export interface SensorReading {
  id: number;
  device: number;
  temperature: number;
  humidity: number;
  timestamp: string;
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export function getDevices() {
  return apiFetch<Device[]>("/devices/");
}

export function getDevice(deviceId: string) {
  return apiFetch<Device>(`/devices/${deviceId}/`);
}

export function getSensorReadings(deviceId?: string) {
  const query = deviceId
    ? `?device_id=${encodeURIComponent(deviceId)}`
    : "";

  return apiFetch<SensorReading[]>(`/readings/${query}`);
}