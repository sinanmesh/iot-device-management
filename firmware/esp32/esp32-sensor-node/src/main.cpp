#include <Arduino.h>
#include <WiFi.h>
#include <DHT.h>
#include "secrets.h"

#define DHT_PIN 4
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {

    Serial.begin(115200);

    dht.begin();

    // Connect to WiFi
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

void loop() {

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
        Serial.println("Sensor reading failed!");
    }
    else {
        Serial.print("Temperature: ");
        Serial.print(temperature);

        Serial.print(" °C | Humidity: ");
        Serial.print(humidity);

        Serial.println(" %");
    }

    delay(2000);
}