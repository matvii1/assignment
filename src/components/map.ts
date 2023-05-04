import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

mapboxgl.accessToken = ACCESS_TOKEN

const PCU_LON = 14.43381
const PCU_LAT = 50.08714
const PCU_CENTER: [number, number] = [PCU_LON, PCU_LAT]

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v11",
  center: PCU_CENTER,
  zoom: 12,
  maxZoom: 21,
  minZoom: 4,
})

map.on("wheel", (event: mapboxgl.MapWheelEvent & mapboxgl.EventData) => {
  if (event.originalEvent.ctrlKey) {
    return
  }

  if (event.originalEvent.metaKey) {
    return
  }

  if (event.originalEvent.altKey) {
    return
  }

  event.preventDefault()
})

const marker = document.createElement("i") as HTMLElement
marker.className = "fa-sharp fa-solid fa-location-dot map-pin"

new mapboxgl.Marker(marker, { anchor: "bottom" })
  .setLngLat(PCU_CENTER)
  .addTo(map)

const nav = new mapboxgl.NavigationControl()

map.addControl(nav)

map.on("load", () => map.resize())
