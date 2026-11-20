"use client";

import {
  Cpu,
  Wifi,
  WifiOff,
  Activity,
  Thermometer,
  Droplets,
} from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ApiStatus } from "@/components/api-status";

import { useEffect, useState } from "react";
import {
  getDevices,
  getSensorReadings,
  type Device,
} from "@/lib/api";

// Sample sensor history (will be connected to API later)
const sensorHistory = [
  { time: "10:00", temperature: 26, humidity: 60 },
  { time: "10:10", temperature: 27, humidity: 62 },
  { time: "10:20", temperature: 28, humidity: 64 },
  { time: "10:30", temperature: 27, humidity: 63 },
  { time: "10:40", temperature: 29, humidity: 65 },
  { time: "10:50", temperature: 29.5, humidity: 65.2 },
];

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "var(--chart-1)",
  },
  humidity: {
    label: "Humidity",
    color: "var(--chart-2)",
  },
};

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [readingCount, setReadingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from Django API
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [deviceData, readingData] = await Promise.all([
          getDevices(),
          getSensorReadings(),
        ]);

        setDevices(deviceData);
        setReadingCount(readingData.length);
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Calculate device statistics
  const onlineCount = devices.filter(
    (device) => device.status === "online"
  ).length;

  const offlineCount = devices.filter(
    (device) => device.status === "offline"
  ).length;

  // Dashboard statistics
  const stats = [
    {
      title: "Total Devices",
      value: devices.length,
      description: "Registered devices",
      icon: Cpu,
    },
    {
      title: "Online Devices",
      value: onlineCount,
      description: "Currently connected",
      icon: Wifi,
    },
    {
      title: "Offline Devices",
      value: offlineCount,
      description: "Currently disconnected",
      icon: WifiOff,
    },
    {
      title: "Total Readings",
      value: readingCount,
      description: "Sensor data collected",
      icon: Activity,
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor your IoT devices and sensor activity.
        </p>

        <ApiStatus />

        {/* Dashboard Statistics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {loading ? "..." : stat.value}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Live Sensor Data - Sample Data */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Live Sensor Data
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest readings from your connected devices.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Temperature
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">29.5</span>
                  <span className="text-sm text-gray-500">°C</span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Device: esp32_001
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-3">
                <Thermometer className="h-7 w-7 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Humidity
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">65.2</span>
                  <span className="text-sm text-gray-500">%</span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Device: esp32_001
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3">
                <Droplets className="h-7 w-7 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sensor History - Sample Data */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Sensor History
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Temperature and humidity readings over time.
        </p>

        <Card className="mt-4">
          <CardContent className="pt-6">
            <ChartContainer
              config={chartConfig}
              className="h-[300px] w-full"
            >
              <AreaChart data={sensorHistory}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <ChartTooltip
                  content={<ChartTooltipContent />}
                />

                <Area
                  dataKey="temperature"
                  type="monotone"
                  fill="var(--color-temperature)"
                  fillOpacity={0.2}
                  stroke="var(--color-temperature)"
                  strokeWidth={2}
                />

                <Area
                  dataKey="humidity"
                  type="monotone"
                  fill="var(--color-humidity)"
                  fillOpacity={0.1}
                  stroke="var(--color-humidity)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Registered Devices */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Registered Devices
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Overview of your connected IoT devices.
            </p>
          </div>

          <Badge variant="outline">
            {devices.length} Devices
          </Badge>
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Temperature</TableHead>
                  <TableHead>Humidity</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-gray-500"
                    >
                      Loading devices...
                    </TableCell>
                  </TableRow>
                ) : devices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-gray-500"
                    >
                      No devices registered yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {device.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {device.device_id}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            device.status === "online"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            device.status === "online"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : ""
                          }
                        >
                          {device.status}
                        </Badge>
                      </TableCell>

                      <TableCell>—</TableCell>

                      <TableCell>—</TableCell>

                      <TableCell className="text-gray-500">
                        {device.last_seen
                          ? new Date(
                              device.last_seen
                            ).toLocaleString()
                          : "Never"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}