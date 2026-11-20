from rest_framework import generics
from .models import Device, SensorReading
from .serializers import DeviceSerializer, SensorReadingSerializer


class DeviceListView(generics.ListAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class DeviceDetailView(generics.RetrieveAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    lookup_field = 'device_id'


class SensorReadingListView(generics.ListAPIView):
    serializer_class = SensorReadingSerializer

    def get_queryset(self):
        queryset = SensorReading.objects.select_related('device')

        device_id = self.request.query_params.get('device_id')

        if device_id:
            queryset = queryset.filter(device__device_id=device_id)

        return queryset