import { DB, QueryConfig, APIResponse } from '../../../types';
import { TodoListItem } from '../../../models';

export async function updateTodoItem(db: DB, args: any) {
  const {
    id,
    item: { content },
  } = args;

  const query: QueryConfig = {
    text: `UPDATE todo_list SET content = $2 WHERE id = $1 RETURNING *`,
    values: [id, content],
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
