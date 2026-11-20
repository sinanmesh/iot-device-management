# REST API Endpoints

Base URL: `http://127.0.0.1:8000/api/`

## 1. List Devices

**GET** `/devices/`

Returns all registered IoT devices.

## 2. Device Details

**GET** `/devices/{device_id}/`

Example: `/devices/esp32_001/`

Returns information about a specific device.

## 3. Sensor Readings

**GET** `/readings/`

Returns all stored sensor readings.

## 4. Filter Sensor Readings

**GET** `/readings/?device_id=esp32_001`

Returns sensor readings belonging to a specific device.

## Response Data

Device information:
- Device ID
- Name
- Status
- Last seen
- Created and updated timestamps

Sensor reading information:
- Device
- Temperature
- Humidity
- Timestamp

## Backend Technologies

- Django
- Django REST Framework
- PostgreSQL
- Paho MQTT

## Data Flow

ESP32 → MQTT Broker → Django MQTT Subscriber → PostgreSQL → REST API → Frontend