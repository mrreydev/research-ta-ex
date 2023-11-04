<template>
    <div class="container m-auto">
        <button class="px-4 py-2 bg-indigo-700 text-white" @click="triggerGeolocation">
            Gunakan Lokasi Saya Saat Ini
        </button>
        <button class="px-4 py-2 bg-indigo-700 text-white" @click="handleCheckDistance">
            Cek Jarak
        </button>

        <div style="height:600px; width:800px">
            <l-map ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="centerMap">
                <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
                ></l-tile-layer>

                <l-circle :lat-lng="officeMap" :radius="30" color="green" />
                <l-marker :lat-lng="markerPos" :draggable="true" @dragend="handleMove"/>
            </l-map>
        </div>

        <p>Center Maps : {{ centerMap }}</p>
        <p>Office Coords: {{ officeMap }}</p>
        <p>Marker Coords: {{ markerPos }}</p>
        <p>Distance between Marker Coords and Office Coords: {{ distance }} m</p>
    </div>
</template>
<script setup>
import "leaflet/dist/leaflet.css";
import {  LCircle, LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref, computed, watch } from 'vue'

const zoom = ref(20);
const centerMap = ref([-6.873618545164691, 107.5620210170746]);
const officeMap = ref([-6.873618545164691, 107.5620210170746]);
// const centerMap = ref([-6.9435392, 107.6363264]);
// const markerPos = ref([-6.920909837600445, 107.56837248802186])
const markerPos = ref([-6.918758399444478, 107.52662658691408]);

const distance = computed(() => {
    const result = calculateDistance(officeMap.value[0], officeMap.value[1], markerPos.value[0], markerPos.value[1]);
    return result.toFixed(2);
});

const triggerGeolocation = () => {
    const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position.coords)
            markerPos.value = [position.coords.latitude, position.coords.longitude]
            centerMap.value = [position.coords.latitude, position.coords.longitude]
        },
        (error) => {
          console.log(error.message)
        },
        options
      )
};

const handleMove = (value) => {
    markerPos.value = [value.target._latlng.lat, value.target._latlng.lng]
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    console.log(lat1, lon1)
    console.log(lat2, lon2)
  // Konversi koordinat ke radian
  lat1 = lat1 * Math.PI / 180;
  lon1 = lon1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;

  // Rumus Haversine
  var d = 6371.01 * Math.acos(
    Math.sin(lat1) * Math.sin(lat2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
  );

  // Mengembalikan jarak dalam kilometer ke meter
  return d * 1000;
}

const handleCheckDistance = () => {
    const result = calculateDistance(officeMap.value[0], officeMap.value[1], markerPos.value[0], markerPos.value[1])
    console.log(result)
    if (result <= 30) {
        console.log('Kamu Bisa Absen')
    } else {
        console.log('Kamu harus ke kantor untuk absen')
    }
}
</script>
<style lang="">
    
</style>