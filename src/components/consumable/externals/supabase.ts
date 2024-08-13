
import { createClient } from '@supabase/supabase-js';

export interface QueryFilter {
    type: string,
    column: string,
    value: any,
}

export interface Query {
    operation: string,
    table: string,
    columns?: Array<string>,
    values?: Object,
    filters?: Array<QueryFilter>,
    limit?: number,
    offset?: number,
}

export interface Response {
    error?: error,
    data?: Array,
    status?: number,
}

export const DBOperations = {
    INSERT: "insert",
    UPDATE: "update",
    DELETE: "delete",
    FETCH: "fetch",
}

export const FilterTypes = {
    EQ: "eq",
    OVERLAP: "overlap",
    LIKE: "like",
}

// Create a single supabase client for interacting with your database
class Supabase {
    private conn = null;
    constructor(url: string, accessKey: string) {
        this.conn = createClient(url, accessKey);
    }

    private buildQuery(q:Query): any {
        let query = this.conn.from(q.table);

        // defining operation
        if(q.operation === DBOperations.INSERT) {
            query = query.insert(value);
            return query;
        } else if(q.operation === DBOperations.UPDATE) {
            query = query.update(value);
        } else if(q.operation === DBOperations.DELETE) {
            query = query.delete();
        } else if(q.operation === DBOperations.FETCH) {
            // check whether columns mentioned
            if(q.columns) {
                query = query.select(q.columns.join(","));
            } else {
                query = query.select();
            }
        } else {
            throw new Error("invalid operation");
            return;
        }

        // ading filters
        if(q.filters.length > 0) {
            q.filters.forEach( (f: QueryFilter) => {
                switch (f.type) {
                    case FilterTypes.EQ:
                        query = query.eq(f.column, f.value);
                        break;
                    case FilterTypes.OVERLAP:
                        if ((f.value as Array<string>).length > 0) {
                            query = query.overlaps(f.column, f.value);
                        } else {
                            throw new Error("overlap query failed");
                        }
                        break;
                    case FilterTypes.LIKE:
                        query = query.like( f.column, `%${f.value}%`);
                    default:
                        throw new Error("filter not defined")
                        break;
                }
            });
        }

        // adding limit and offset
        if(q.limit > 0) {
            query = query.range(offset, offset+limit);
        }

        return query;
    }

    async executeQuery(query: Query): Promise{
        return await this.buildQuery(query)
    }
} 

const supabase = new Supabase(import.meta.env.VITE_SUPABASE_PROJECT_PORTFOLIO_API_URL, import.meta.env.VITE_SUPABASE_PROJECT_PORTFOLIO_API_KEY)
export default supabase;