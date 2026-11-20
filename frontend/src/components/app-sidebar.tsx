import Link from "next/link";
import {
  LayoutDashboard,
  Cpu,
  Activity,
  Settings,
  Wifi,
  Radio,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: Cpu,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: Activity,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Radio size={21} />
        </div>

        <div>
          <h1 className="font-semibold text-gray-900">
            IoT Manager
          </h1>
          <p className="text-xs text-gray-500">
            Device Monitoring
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        {navigation.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={19} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Connection Status */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <Wifi size={20} className="text-green-600" />

          <div>
            <p className="text-sm font-medium text-gray-800">
              MQTT Broker
            </p>
            <p className="text-xs text-green-600">
              Connected
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}