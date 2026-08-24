const FIRST_RING_CAPACITY = 8;
const RING_CAPACITY_STEP = 4;
const FIRST_RING_RADIUS = 58;
const RING_RADIUS_STEP = 46;
const MINIMUM_MARKER_GAP = 46;

function locationKey(group) {
  return `${Number(group.latitude).toFixed(5)}:${Number(group.longitude).toFixed(5)}`;
}

function ringRadius(ringIndex, itemCount) {
  const collisionSafeRadius = itemCount > 1
    ? (MINIMUM_MARKER_GAP / 2) / Math.sin(Math.PI / itemCount)
    : 0;
  return Math.max(FIRST_RING_RADIUS + ringIndex * RING_RADIUS_STEP, collisionSafeRadius);
}

export function markerOffsetMap(groups) {
  const buckets = new Map();
  const offsets = new Map();

  groups.forEach((group) => {
    const key = locationKey(group);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(group);
  });

  buckets.forEach((bucket) => {
    if (bucket.length === 1) {
      offsets.set(bucket[0].id, { x: 0, y: 0 });
      return;
    }

    const ordered = [...bucket].sort((left, right) => (
      left.type.localeCompare(right.type) || left.id.localeCompare(right.id)
    ));
    let cursor = 0;
    let ringIndex = 0;

    while (cursor < ordered.length) {
      const capacity = FIRST_RING_CAPACITY + ringIndex * RING_CAPACITY_STEP;
      const ring = ordered.slice(cursor, cursor + capacity);
      const radius = ringRadius(ringIndex, ring.length);
      const phase = -Math.PI / 2 + (ringIndex % 2 ? Math.PI / ring.length : 0);

      ring.forEach((group, index) => {
        const angle = phase + (Math.PI * 2 * index) / ring.length;
        offsets.set(group.id, {
          x: Math.round(Math.cos(angle) * radius),
          y: Math.round(Math.sin(angle) * radius),
        });
      });

      cursor += ring.length;
      ringIndex += 1;
    }
  });

  return offsets;
}
