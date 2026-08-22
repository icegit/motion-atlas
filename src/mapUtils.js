export function formatActivityCount(count) {
  return `${count} ${count === 1 ? "activity" : "activities"}`;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function popupMarkup(group) {
  const rows = Object.entries(group.years)
    .sort(([left], [right]) => {
      if (left === "Unknown") return 1;
      if (right === "Unknown") return -1;
      return right.localeCompare(left);
    })
    .map(
      ([year, count]) => `
        <li>
          <span>${escapeHtml(year)}</span>
          <strong>${escapeHtml(formatActivityCount(count))}</strong>
        </li>`,
    )
    .join("");

  return `
    <article class="popup-card">
      <p class="popup-card__eyebrow">${escapeHtml(group.label)}</p>
      <h2>${escapeHtml(formatActivityCount(group.activityCount))}</h2>
      <p class="popup-card__context">Grouped activity starts within ${escapeHtml(group.clusterRadiusKm)} km.</p>
      <ul>${rows}</ul>
    </article>`;
}
