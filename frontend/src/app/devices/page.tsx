"use client";

import { useEffect, useState } from "react";
import { Plus, Cpu } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { getDevices, type Device } from "@/lib/api";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDevices() {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch {
        setError("Unable to load devices from the backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchDevices();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Devices
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Register and manage your IoT devices.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="p-0">
          {loading ? (
            <p className="p-8 text-center text-sm text-gray-500">
              Loading devices...
            </p>
          ) : error ? (
            <p className="p-8 text-center text-sm text-red-600">
              {error}
            </p>
          ) : devices.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <Cpu className="h-10 w-10 text-gray-400" />
              <p className="mt-3 font-medium">No devices registered</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">
                      {device.device_id}
                    </TableCell>

                    <TableCell>{device.name}</TableCell>

                    <TableCell>
                      <Badge
                        className={
                          device.status === "online"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : ""
                        }
                        variant={
                          device.status === "online"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {device.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-gray-500">
                      {device.last_seen
                        ? new Date(device.last_seen).toLocaleString()
                        : "Never"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}