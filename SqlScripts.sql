DROP INDEX IF EXISTS idx_todo_items;
DROP TRIGGER IF EXISTS update_todo_items_updated_at ON todo_items;
DROP FUNCTION IF EXISTS update_updated_at;
DROP TABLE IF EXISTS todo_items CASCADE;

CREATE TABLE todo_items
(
  id          SERIAL PRIMARY KEY,
  description VARCHAR(1000)            NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_checked  BOOLEAN                  NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_todo_items ON todo_items (
                                           created_at
  );

CREATE FUNCTION update_updated_at() RETURNS TRIGGER
  LANGUAGE plpgsql AS
$$
BEGIN
  new.updated_at = CURRENT_TIMESTAMP;
  RETURN new;
END;
$$;

CREATE TRIGGER update_todo_items_updated_at
  BEFORE UPDATE
  ON todo_items
  FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

