-- CreateView
CREATE MATERIALIZED VIEW "MostSearchByDateTime"
AS
SELECT 
    datetime, 
    CAST((SELECT COUNT(*) FROM public."SearchHistory" as subquery
     WHERE subquery.datetime >= main.datetime
       AND subquery.datetime < main.datetime + interval '1 hour') as int) as search_count
FROM public."SearchHistory" as main
group by main.datetime
order by search_count desc
WITH DATA;

CREATE UNIQUE INDEX "search_date_time" 
ON "MostSearchByDateTime" (datetime);

