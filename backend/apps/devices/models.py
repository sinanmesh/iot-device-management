from django.db import models


class Device(models.Model):

    STATUS_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]

    device_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=150)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='offline'
    )

    last_seen = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.device_id


class SensorReading(models.Model):

    device = models.ForeignKey(
        Device,
        on_delete=models.CASCADE,
        related_name='readings'
    )

    temperature = models.FloatField()
    humidity = models.FloatField()

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['device', '-timestamp']),
        ]

    def __str__(self):
        return f"{self.device.device_id} - {self.timestamp}"
