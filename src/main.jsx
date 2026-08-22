import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SPORT_META, sportIcon, sportIconNode } from "./sportConfig";
import { formatActivityCount, popupMarkup } from "./mapUtils";
import "./styles.css";

const DATA_URL = `${import.meta.env.BASE_URL}data/activity-groups.json`;

function svgIconMarkup(type) {
  const nodes = sportIconNode(type)
    .map(([tag, attributes]) => {
      const renderedAttributes = Object.entries(attributes)
        .filter(([name]) => name !== "key")
        .map(([name, value]) => `${name}="${String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`)
        .join(" ");
      return `<${tag} ${renderedAttributes} />`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${nodes}</svg>`;
}

function markerMarkup(group) {
  const meta = SPORT_META[group.type] ?? SPORT_META.other;
  const glyph = svgIconMarkup(group.type);

  return `
    <div class="sport-pin" style="--sport-color:${meta.color}">
      <span class="sport-pin__glyph">${glyph}</span>
      ${group.activityCount > 1 ? `<span class="sport-pin__count">${group.activityCount}</span>` : ""}
    </div>`;
}

function ActivityMap({ groups, activeSports }) {
  const elementRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(null);
  const fittedRef = useRef(false);

  useEffect(() => {
    const map = L.map(elementRef.current, {
      center: [24, 9],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      worldCopyJump: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markersRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    const visibleGroups = groups.filter((group) => activeSports.has(group.type));

    visibleGroups.forEach((group) => {
      const marker = L.marker([group.latitude, group.longitude], {
        keyboard: true,
        title: `${group.label}: ${formatActivityCount(group.activityCount)}`,
        alt: `${group.label} activity cluster`,
        icon: L.divIcon({
          className: "sport-marker",
          html: markerMarkup(group),
          iconSize: [42, 46],
          iconAnchor: [21, 41],
          popupAnchor: [0, -37],
        }),
      });
      marker.bindPopup(popupMarkup(group), {
        className: "activity-popup",
        maxWidth: 360,
        minWidth: 320,
      });
      marker.addTo(layer);
    });

    if (!fittedRef.current && groups.length) {
      const bounds = L.latLngBounds(groups.map((group) => [group.latitude, group.longitude]));
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.18), { maxZoom: 4 });
      fittedRef.current = true;
    }
  }, [groups, activeSports]);

  return <div ref={elementRef} className="map" aria-label="World map of Garmin activities" />;
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [activeSports, setActiveSports] = useState(new Set());
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(DATA_URL, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Activity data returned ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setActiveSports(new Set(payload.sportTotals.map((sport) => sport.type)));
      })
      .catch(() => {
        if (!cancelled) setError("The activity archive is temporarily unavailable.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sportTotals = data?.sportTotals ?? [];
  const groups = data?.groups ?? [];
  const years = useMemo(() => {
    const values = new Set();
    groups.forEach((group) => Object.keys(group.years).forEach((year) => values.add(year)));
    return [...values].filter((year) => year !== "Unknown").sort((a, b) => b.localeCompare(a));
  }, [groups]);

  const toggleSport = (type) => {
    setActiveSports((current) => {
      const next = new Set(current);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const showAll = () => setActiveSports(new Set(sportTotals.map((sport) => sport.type)));

  return (
    <main>
      <ActivityMap groups={groups} activeSports={activeSports} />

      <section className={`explorer ${panelOpen ? "is-open" : "is-closed"}`} aria-label="Activity map controls">
        <button
          className="panel-toggle"
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={panelOpen}
          aria-label={panelOpen ? "Collapse activity summary" : "Open activity summary"}
        >
          <span aria-hidden="true">{panelOpen ? "−" : "+"}</span>
        </button>

        <div className="explorer__content">
          <div className="brand-row">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <p>GARMIN ACTIVITY ARCHIVE</p>
          </div>
          <h1>Motion Atlas</h1>
          <p className="lede">A life in movement, mapped across the world.</p>

          {error ? <div className="notice notice--error">{error}</div> : null}
          {!data && !error ? <div className="notice"><span className="pulse" /> Loading activities…</div> : null}

          {data ? (
            <>
              <div className="stats" aria-label="Archive summary">
                <Stat value={data.mappedActivities.toLocaleString()} label="mapped" />
                <Stat value={sportTotals.length.toLocaleString()} label="sports" />
                <Stat value={years.length.toLocaleString()} label="years" />
              </div>

              <div className="section-heading">
                <span>SPORTS</span>
                <button type="button" onClick={showAll}>Show all</button>
              </div>

              <div className="sport-filters">
                {sportTotals.map((sport) => {
                  const meta = SPORT_META[sport.type] ?? SPORT_META.other;
                  const selected = activeSports.has(sport.type);
                  const SportIcon = sportIcon(sport.type);
                  return (
                    <button
                      type="button"
                      key={sport.type}
                      className={selected ? "sport-filter is-active" : "sport-filter"}
                      style={{ "--sport-color": meta.color }}
                      onClick={() => toggleSport(sport.type)}
                      aria-pressed={selected}
                    >
                      <span className="sport-filter__icon" aria-hidden="true">
                        <SportIcon stroke={1.9} />
                      </span>
                      <span className="sport-filter__label">{sport.label}</span>
                      <strong>{sport.activityCount}</strong>
                    </button>
                  );
                })}
              </div>

              <div className="privacy-note">
                <span aria-hidden="true">◎</span>
                <p>
                  Nearby matching sports are combined within {data.clusterRadiusKm} km.
                  Locations are rounded for privacy.
                </p>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {data ? (
        <div className="map-caption">
          <span className="live-dot" aria-hidden="true" />
          Updated {new Date(data.generatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          {data.unlocatedActivities ? ` · ${data.unlocatedActivities} without GPS` : ""}
        </div>
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
