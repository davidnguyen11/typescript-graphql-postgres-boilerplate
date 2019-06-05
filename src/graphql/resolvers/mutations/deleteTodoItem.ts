import { DB, QueryConfig, APIResponse } from '../../../types';
import { TodoListItem } from '../../../models';

export async function deleteTodoItem(db: DB, args: any) {
  const { id } = args;

  const query: QueryConfig = {
    text: `DELETE FROM todo_list WHERE id = $1 RETURNING *`,
    values: [id],
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
    } else {
      response.status = 'error';
      response.message = 'Record is not found';
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
