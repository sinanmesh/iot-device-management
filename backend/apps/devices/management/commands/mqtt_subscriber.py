import json
import paho.mqtt.client as mqtt

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.devices.models import Device, SensorReading


BROKER_HOST = "127.0.0.1"
BROKER_PORT = 1883
MQTT_TOPIC = "iot/devices/+/telemetry"


class Command(BaseCommand):

    help = "Listen for IoT device telemetry through MQTT"

    def handle(self, *args, **options):

        def on_connect(client, userdata, flags, reason_code, properties):
            if reason_code.is_failure:
                self.stdout.write(
                    self.style.ERROR(f"MQTT connection failed: {reason_code}")
                )
                return

            self.stdout.write(
                self.style.SUCCESS("Connected to MQTT broker!")
            )

            client.subscribe(MQTT_TOPIC)
            self.stdout.write(f"Subscribed to: {MQTT_TOPIC}")

        def on_message(client, userdata, message):

            try:
                data = json.loads(message.payload.decode())

                device_id = data["device_id"]
                temperature = float(data["temperature"])
                humidity = float(data["humidity"])

                now = timezone.now()

                device, created = Device.objects.get_or_create(
                    device_id=device_id,
                    defaults={"name": device_id}
                )

                device.status = "online"
                device.last_seen = now
                device.save(update_fields=["status", "last_seen", "updated_at"])

                SensorReading.objects.create(
                    device=device,
                    temperature=temperature,
                    humidity=humidity
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"{device_id} | "
                        f"Temperature: {temperature}°C | "
                        f"Humidity: {humidity}%"
                    )
                )

            except (KeyError, ValueError, TypeError, json.JSONDecodeError) as error:
                self.stderr.write(f"Invalid telemetry message: {error}")

        client = mqtt.Client(
            mqtt.CallbackAPIVersion.VERSION2,
            client_id="django_iot_subscriber"
        )

        client.on_connect = on_connect
        client.on_message = on_message

        self.stdout.write("Connecting to MQTT broker...")

        try:
            client.connect(BROKER_HOST, BROKER_PORT, 60)
            client.loop_forever()

        except KeyboardInterrupt:
            self.stdout.write("MQTT subscriber stopped.")

        finally:
            client.disconnect()