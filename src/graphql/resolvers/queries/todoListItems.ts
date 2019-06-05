import { DB, QueryConfig, APIResponse } from '../../../types';
import { TodoListItem } from '../../../models';

export async function todoListItems(db: DB, args: any) {
  let query: QueryConfig = { text: 'SELECT * FROM todo_list' };

  if (args && args.keyword) {
    query = {
      text: `SELECT * FROM todo_list WHERE content LIKE '%' || $1 || '%'`,
      values: [args.keyword],
    };
  }

  const result = await db.query(query);

  const response: APIResponse<TodoListItem[]> = {
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
