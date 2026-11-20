"use client";

import { useEffect, useState } from "react";
import { getDevices, getSensorReadings } from "@/lib/api";

export function ApiStatus() {
  const [deviceCount, setDeviceCount] = useState<number | null>(null);
  const [readingCount, setReadingCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [devices, readings] = await Promise.all([
          getDevices(),
          getSensorReadings(),
        ]);

        setDeviceCount(devices.length);
        setReadingCount(readings.length);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to connect to API."
        );
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-6 rounded-lg border bg-white p-4">
      <h2 className="font-semibold">Backend API Connection</h2>

      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : deviceCount === null ? (
        <p className="mt-2 text-sm text-gray-500">Loading API data...</p>
      ) : (
        <div className="mt-3 flex gap-8 text-sm">
          <p>
            Devices: <strong>{deviceCount}</strong>
          </p>
          <p>
            Sensor readings: <strong>{readingCount}</strong>
          </p>
        </div>
      )}
    </div>
  );
}