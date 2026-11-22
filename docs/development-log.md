# Development Log

## Milestone 1: ESP32 Sensor Integration

**Status:** Completed

- Configured ESP32 development environment using PlatformIO.
- Connected DHT11 temperature and humidity sensor.
- Developed firmware using C++.
- Successfully collected temperature and humidity readings.
- Verified sensor readings through Serial Monitor.

## Milestone 2: Wi-Fi Connectivity

**Status:** Completed

- Integrated ESP32 Wi-Fi functionality.
- Connected ESP32 to a wireless network.
- Retrieved local IP address.
- Verified simultaneous sensor readings and Wi-Fi connectivity.

## Next Milestone

MQTT communication between ESP32 and an MQTT broker.


## Milestone 3: MQTT Communication and Sensor Data Publishing

**Status:** Completed

### Objective
Establish communication between the ESP32 sensor node and a local MQTT broker to transmit sensor readings over Wi-Fi.

### Implementation
- Installed and configured Eclipse Mosquitto MQTT Broker on Windows.
- Configured the broker to accept connections from devices on the local network.
- Added the PubSubClient library to the ESP32 PlatformIO project.
- Connected ESP32 to the MQTT broker over Wi-Fi.
- Implemented automatic MQTT reconnection.
- Published DHT11 temperature and humidity readings in JSON format.

### MQTT Configuration

| Parameter | Value |
|---|---|
| Broker | Mosquitto |
| Protocol | MQTT |
| Port | 1883 |
| Device ID | esp32_001 |
| Telemetry topic | `iot/devices/esp32_001/telemetry` |
| Payload format | JSON |

### Example Telemetry Payload

```json
{
  "device_id": "esp32_001",
  "temperature": 29.5,
  "humidity": 65.2
}
```

### Testing and Results
- Verified MQTT broker operation.
- Tested communication between PC and MQTT broker.
- Successfully connected ESP32 to the broker.
- Confirmed that temperature and humidity readings were published.
- Verified incoming telemetry using the Mosquitto subscriber.

### Outcome
Successfully established end-to-end communication between the ESP32 sensor node and the local MQTT broker.

### Next Milestone
Develop a Django REST Framework backend to subscribe to MQTT telemetry, process incoming sensor data, and store readings in PostgreSQL.




## Milestone 4: Django Backend and REST API

**Completed work:**

- Created Django backend project.
- Configured PostgreSQL database.
- Created Device and SensorReading models.
- Integrated ESP32 telemetry through MQTT.
- Implemented MQTT subscriber using Paho MQTT.
- Stored incoming temperature and humidity readings in PostgreSQL.
- Configured Django Admin for device and sensor monitoring.
- Created REST API serializers and views.
- Implemented device listing and detail endpoints.
- Implemented sensor reading endpoints with device filtering.
- Tested API endpoints using Django REST Framework's browsable API.

**Result:**

Successfully established communication between ESP32 hardware, MQTT broker, Django backend, and PostgreSQL database. Sensor data can now be accessed through REST API endpoints.

**Next milestone:** Build the Next.js frontend dashboard.



## Milestone 5: Frontend Dashboard Integration

**Status:** Completed

### Implemented
- Created the Next.js dashboard interface.
- Integrated the frontend with the Django REST API.
- Connected device list data to the backend.
- Connected device and sensor-reading counts to dashboard statistics.
- Added dynamic online and offline device counts.
- Displayed registered devices with their IDs, statuses, and last-seen timestamps.
- Added Devices, Analytics, and Settings pages.

### Current Limitations
- Live Sensor Data cards still use sample values.
- Sensor History chart still uses sample data.
- Temperature and humidity are not yet displayed per device in the device table.
- Device registration and settings actions are placeholders.

### Technologies
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Django REST Framework

### Next Step
Connect actual sensor readings from the backend to the dashboard's live sensor cards, device table, and historical charts.

## Milestone 6: Real-Time Sensor Dashboard

**Status:** Completed

### Implemented
- Connected device temperature and humidity values to actual sensor readings.
- Displayed the latest sensor readings in dashboard cards.
- Replaced sample chart data with actual database readings.
- Displayed the latest 20 sensor readings in the history chart.
- Implemented automatic dashboard data refresh every 5 seconds.

### Data Flow
ESP32 → MQTT → Django Backend → PostgreSQL → REST API → Next.js Dashboard

### Technologies
- Next.js
- React
- TypeScript
- Django REST Framework
- PostgreSQL
- MQTT
- Recharts

### Result
The dashboard now displays actual sensor data collected from the ESP32 and updates automatically.