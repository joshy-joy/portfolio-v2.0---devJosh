
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

inerface supabaseData {
    status: string;
    data: Array<Object>;
}

inerface supabaseResponse {
    data?: supabaseData;
    error?: any;
}

// Create a single supabase client for interacting with your database
export default class Supabase {
    private conn: createClient<Database> = null;
    constructor(url: string, accessKey: string) {
        this.conn = createClient(url, accessKey);
    }

    async fetchAll(table: string): supabaseResponse {
        const r: supabaseResponse;
        r.data, r.error = await this.conn
        .from(table)
        .select();
        return r;
    }
    
    async fetchAllWithLimitAndOffset(table: string, limit: Number, offset: Number): supabaseResponse {
        const r: supabaseResponse;
        r.data, r.error = await this.conn
        .from(table)
        .select()
        .range(offset, offset+limit);
        return r;
    }

    async fetchAllWithOverlap(table: string, column: string, overlap: Array<string>): supabaseResponse {
        const r: supabaseResponse;
        r.data, r.error = await this.conn
        .from(table)
        .select()
        .overlaps(column, overlap)
        return r;
    }

    async fetchAllWithStringMatch(table: string, column: string, filter: string): supabaseResponse {
        const r: supabaseResponse;
        r.data, r.error = await this.conn
        .from(table)
        .select()
        .like( col, `%${filter}%`)
        return r;
    }

    async insertRow(table: string, data: Object): string {
        const error = await this.conn
        .from(table)
        .select()
        .insert(data)
        return error;
    }

    async updateRowByID(table: string, data: Object, id: string): string {
        const error = await this.conn
        .from(table)
        .select()
        .update(data)
        .eq('id', id)
        return error;
    }

    async deleteRowByID(table: string, id: string): string {
        const error = await this.conn
        .from(table)
        .select()
        .delete()
        .eq('id', id)
    }
} 