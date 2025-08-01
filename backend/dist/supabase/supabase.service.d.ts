import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
export declare class SupabaseService {
    private config;
    private client;
    constructor(config: ConfigService);
    getClient(): SupabaseClient;
}
