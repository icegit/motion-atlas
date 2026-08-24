export function areAllSportsActive(activeSports, sportTypes) {
  return sportTypes.length > 0
    && activeSports.size === sportTypes.length
    && sportTypes.every((type) => activeSports.has(type));
}

export function toggleAllSports(activeSports, sportTypes) {
  return areAllSportsActive(activeSports, sportTypes) ? new Set() : new Set(sportTypes);
}

export function toggleSportSelection(activeSports, type, sportTypes) {
  if (areAllSportsActive(activeSports, sportTypes)) return new Set([type]);

  const next = new Set(activeSports);
  if (next.has(type)) next.delete(type);
  else next.add(type);
  return next;
}
