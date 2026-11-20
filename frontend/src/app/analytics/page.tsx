"use client";

import { Activity, Thermometer, Droplets } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    title: "Average Temperature",
    value: "28.4°C",
    icon: Thermometer,
  },
  {
    title: "Average Humidity",
    value: "63.2%",
    icon: Droplets,
  },
  {
    title: "Total Readings",
    value: "2,450",
    icon: Activity,
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Analyze sensor readings and device activity.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.title}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-500">
                    {metric.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {metric.value}
                  </h2>
                </div>

                <div className="rounded-lg bg-blue-50 p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Activity className="h-10 w-10 text-gray-400" />

          <h2 className="mt-4 text-lg font-semibold">
            Detailed analytics
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Historical reports and device performance analysis
            will appear here.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}