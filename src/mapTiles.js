export const FALLBACK_BASEMAP_TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
const CARTO_ATTRIBUTION = '&copy; <a href="https://carto.com/attributions">CARTO</a>';

export const DEFAULT_MAP_STYLE = "satellite";

export const MAP_STYLES = Object.freeze({
  standard: {
    label: "Standard",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    attribution: `${OSM_ATTRIBUTION} ${CARTO_ATTRIBUTION}`,
    subdomains: "abcd",
    maxNativeZoom: 20,
    opacity: 0.48,
  },
  minimal: {
    label: "Minimal",
    url: FALLBACK_BASEMAP_TILE_URL,
    attribution: `${OSM_ATTRIBUTION} ${CARTO_ATTRIBUTION}`,
    subdomains: "abcd",
    maxNativeZoom: 20,
    opacity: 0.2,
  },
  cycle: {
    label: "Cycle",
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution: `${OSM_ATTRIBUTION} | Style: <a href="https://www.cyclosm.org/">CyclOSM</a>`,
    subdomains: "abc",
    maxNativeZoom: 20,
    opacity: 0.5,
  },
  topo: {
    label: "Topo",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: `${OSM_ATTRIBUTION}, SRTM | Style: <a href="https://opentopomap.org/">OpenTopoMap</a>`,
    subdomains: "abc",
    maxNativeZoom: 17,
    opacity: 0.36,
  },
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri and its imagery providers",
    maxNativeZoom: 19,
    opacity: 0.48,
  },
});

export const MOBILE_TILE_OPTIONS = Object.freeze({
  updateWhenIdle: false,
  updateWhenZooming: false,
  keepBuffer: 6,
  crossOrigin: "anonymous",
});
