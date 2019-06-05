import { DB, QueryConfig, APIResponse } from '../../../types';
import { TodoListItem } from '../../../models';

export async function createTodoItem(db: DB, args: any) {
  const {
    item: { content },
  } = args;

  const query: QueryConfig = {
    text: `INSERT INTO todo_list(content) VALUES($1) RETURNING *`,
    values: [content],
  };

  const result = await db.query(query);
  const response: APIResponse<TodoListItem> = {
    status: 'fetching',
  };

  try {
    if (result.rowCount > 0) {
      const data = result.rows.map((item: TodoListItem) => {
        return {
          id: item.id,
          content: item.content,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        };
      });
      response.status = 'success';
      response.data = data;
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
