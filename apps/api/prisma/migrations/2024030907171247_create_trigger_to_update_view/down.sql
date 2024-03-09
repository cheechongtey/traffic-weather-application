DROP TRIGGER IF EXISTS "refresh_my_materialized_view_trigger" ON "SearchHistory";
DROP FUNCTION IF EXISTS "refresh_my_materialized_view_concurrently()";