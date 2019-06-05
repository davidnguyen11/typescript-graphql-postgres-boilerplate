import { DB, QueryConfig } from '../../types';
import { TodoListItem } from '../../models';

const resolver = {
  Query: {
    genres: async (db: DB, args: any) => {
      let query: QueryConfig = { text: 'SELECT * FROM todo_list' };

      if (args && args.content) {
        query = {
          text: 'SELECT * FROM todo_list WHERE content = $1',
          values: [args.content],
        };
      }

      const result = await db.query(query);

      let data = [];

      if (result.rowCount > 0) {
        data = result.rows.map((item: TodoListItem) => {
          return {
            id: item.id,
            content: item.content,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          };
        });
      }

      return data;
    },
  },
  Mutation: {
    createGenre: (comment: any) => {
      return {
        id: 111,
        text: 'asd',
      };
    },
  },
};

export default resolver;
