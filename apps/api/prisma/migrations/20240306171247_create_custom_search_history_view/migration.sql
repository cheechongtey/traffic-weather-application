-- CreateView
CREATE VIEW "CustomSearchHistoryView" AS
SELECT TO_CHAR(datetime, 'YYYY-MM-DD HH24') AS search_date, location_coordinates, location_name, COUNT(*) AS search_count FROM "SearchHistory"
GROUP BY search_date, location_coordinates, location_name
