from django.contrib import admin
from .models import Device, SensorReading


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ('device_id', 'name', 'status', 'last_seen')
    list_filter = ('status',)
    search_fields = ('device_id', 'name')


@admin.register(SensorReading)
class SensorReadingAdmin(admin.ModelAdmin):
    list_display = ('device', 'temperature', 'humidity', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('device__device_id',)
    readonly_fields = ('timestamp',)