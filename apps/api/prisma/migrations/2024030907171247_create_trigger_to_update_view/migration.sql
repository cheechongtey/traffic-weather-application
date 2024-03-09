CREATE OR REPLACE FUNCTION refresh_my_materialized_view_concurrently()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY "MostSearchByDateTime";
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER "refresh_my_materialized_view_trigger"
AFTER INSERT ON "SearchHistory"
FOR EACH ROW EXECUTE FUNCTION refresh_my_materialized_view_concurrently();