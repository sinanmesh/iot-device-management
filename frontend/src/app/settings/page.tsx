import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your application configuration.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Application Name</p>
                <p className="text-sm text-gray-500">
                  IoT Device Manager
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Application Version</p>
                <p className="text-sm text-gray-500">
                  1.0.0
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MQTT Configuration</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Broker Host</p>
                <p className="text-sm text-gray-500">
                  127.0.0.1
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Broker Port</p>
                <p className="text-sm text-gray-500">
                  1883
                </p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Protocol</p>
                <p className="text-sm text-gray-500">
                  MQTT
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}