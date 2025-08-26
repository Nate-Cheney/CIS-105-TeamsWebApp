// Fetch and parse CSV, populate dropdown, and handle selection.
(async function() {
  const select = document.getElementById('team-select');
  const info = document.getElementById('team-info');
  const detailsEl = document.getElementById('team-details');
  const logoEl = document.getElementById('team-logo');

  // Load CSV text
  const resp = await fetch('Data/team_data.csv');
  const csvText = await resp.text();

  // Simple CSV parse (no validation per requirements)
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  const idx = Object.fromEntries(headers.map((h,i)=>[h,i]));

  const teams = lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      abbr: cols[idx.team_abbr],
      name: cols[idx.team_name],
      division: cols[idx.team_division],
      logo: cols[idx.team_logo_espn]
    };
  });

  // Populate select
  teams.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.abbr;
    opt.textContent = `${t.abbr} - ${t.name}`;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const abbr = select.value;
    if (!abbr) { info.classList.add('hidden'); return; }
    const team = teams.find(t => t.abbr === abbr);
    if (!team) { info.classList.add('hidden'); return; }
  detailsEl.innerHTML = `Name: ${team.name}<br>Abbr: ${team.abbr}<br>Division: ${team.division}`;
    logoEl.src = team.logo;
    logoEl.alt = `${team.name} logo`;
    info.classList.remove('hidden');
  });
})();
