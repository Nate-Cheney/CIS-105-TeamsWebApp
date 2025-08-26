SELECT team_abbr, team_name, team_division, team_logo_espn
FROM teams
WHERE team_abbr NOT IN ('LAR', 'OAK', 'STL', 'SD');
