#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include "secrets.h"

// DHT11 configuration
#define DHT_PIN 4
#define DHT_TYPE DHT11

// MQTT configuration
const char* mqtt_server = "192.168.1.73";
const int mqtt_port = 1883;

const char* device_id = "esp32_001";
const char* mqtt_topic = "iot/devices/esp32_001/telemetry";

// Objects
DHT dht(DHT_PIN, DHT_TYPE);

WiFiClient espClient;
PubSubClient mqttClient(espClient);

// Connect to WiFi
void connectWiFi() {
    Serial.println("\nConnecting to WiFi...");

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nWiFi Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

// Connect to MQTT broker
void connectMQTT() {
    while (!mqttClient.connected()) {
        Serial.print("Connecting to MQTT...");

        if (mqttClient.connect(device_id)) {
            Serial.println("Connected!");
        } else {
            Serial.print("Failed. State: ");
            Serial.println(mqttClient.state());
            delay(3000);
        }
    }
}

void setup() {
    Serial.begin(115200);

    dht.begin();

    connectWiFi();

    mqttClient.setServer(mqtt_server, mqtt_port);

    // Test direct TCP connection
    Serial.println("Testing TCP connection to MQTT broker...");

    if (espClient.connect(mqtt_server, mqtt_port)) {
        Serial.println("TCP connection successful!");
        espClient.stop();
    } else {
        Serial.println("TCP connection failed!");
    }

    connectMQTT();
}

void loop() {

    // Maintain MQTT connection
    if (WiFi.status() != WL_CONNECTED) {
        connectWiFi();
    }

    if (!mqttClient.connected()) {
        connectMQTT();
    }

    mqttClient.loop();

    // Read sensor
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
        Serial.println("Sensor reading failed!");
    } else {

        // Display readings
        Serial.print("Temperature: ");
        Serial.print(temperature);

        Serial.print(" °C | Humidity: ");
        Serial.print(humidity);

        Serial.println(" %");

        // Create JSON payload
        char payload[128];

        snprintf(
            payload,
            sizeof(payload),
            "{\"device_id\":\"%s\",\"temperature\":%.1f,\"humidity\":%.1f}",
            device_id,
            temperature,
            humidity
        );

        // Publish to MQTT
        if (mqttClient.publish(mqtt_topic, payload)) {
            Serial.println("MQTT Published:");
            Serial.println(payload);
        } else {
            Serial.println("MQTT Publish Failed!");
        }
    }

    delay(2000);
}