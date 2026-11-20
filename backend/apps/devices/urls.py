from django.urls import path
from .views import (
    DeviceListView,
    DeviceDetailView,
    SensorReadingListView,
)

urlpatterns = [
    path('devices/', DeviceListView.as_view(), name='device-list'),
    path('devices/<str:device_id>/', DeviceDetailView.as_view(), name='device-detail'),
    path('readings/', SensorReadingListView.as_view(), name='sensor-reading-list'),
]