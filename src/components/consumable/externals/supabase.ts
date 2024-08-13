
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
    error?: Error,
    data?: Array<Object>,
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
    private conn: any;
    constructor(url: string, accessKey: string) {
        this.conn = createClient(url, accessKey);
    }

    private buildQuery(q:Query): any {
        if(this.conn) {
            let query = this.conn.from(q.table);

            // defining operation
            if(q.operation === DBOperations.INSERT) {
                query = query.insert(q.values);
                return query;
            } else if(q.operation === DBOperations.UPDATE) {
                query = query.update(q.values);
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
            if(q.filters && q.filters.length > 0) {
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
                            throw new Error("filter not defined");
                            break;
                    }
                });
            }

            // adding limit and offset
            if(q.limit && q.offset && q.limit > 0) {
                query = query.range(q.offset, q.offset+q.limit);
            }

            return query;
        }
        throw new Error("database disconnected");
    }

    async executeQuery(query: Query): Promise<Response> {
        return await this.buildQuery(query)
    }
} 

const supabase = new Supabase(import.meta.env.VITE_SUPABASE_PROJECT_PORTFOLIO_API_URL, import.meta.env.VITE_SUPABASE_PROJECT_PORTFOLIO_API_KEY)
export default supabase;