import { connect } from './connect';
import { DB } from '../types/db';
const pool = connect();

export const db: DB = {
  query: (text: string, params: any, callback: void) => {
    return pool.query(text, params, callback)
  },
};
