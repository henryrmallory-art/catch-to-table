export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      species: {
        Row: {
          id: string
          common_name: string
          scientific_name: string | null
          species_group: string | null
          water_type: 'saltwater' | 'freshwater' | 'both'
          image_url: string | null
          identifying_features: Json | null
          handling_notes: Json | null
          flavor_profile: string | null
          is_hms: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          common_name: string
          scientific_name?: string | null
          species_group?: string | null
          water_type: 'saltwater' | 'freshwater' | 'both'
          image_url?: string | null
          identifying_features?: Json | null
          handling_notes?: Json | null
          flavor_profile?: string | null
          is_hms?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          common_name?: string
          scientific_name?: string | null
          species_group?: string | null
          water_type?: 'saltwater' | 'freshwater' | 'both'
          image_url?: string | null
          identifying_features?: Json | null
          handling_notes?: Json | null
          flavor_profile?: string | null
          is_hms?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      catch_log: {
        Row: {
          id: string
          user_id: string | null
          species_id: string | null
          species_confirmed: boolean
          ai_confidence: number | null
          ai_top_3: Json | null
          latitude: number | null
          longitude: number | null
          location_point: unknown | null
          jurisdiction_id: string | null
          fishing_mode: 'shore' | 'private_boat' | 'for_hire' | null
          measured_length_inches: number | null
          measurement_method: 'ar_ruler' | 'reference_object' | 'manual' | null
          measurement_photo_url: string | null
          decision: 'keep' | 'release' | 'undecided' | null
          decision_reason: string | null
          photo_url: string | null
          caught_at: string
          created_at: string
          crew_size: number
          angler_number: number
        }
      }
      regulations: {
        Row: {
          id: string
          species_id: string | null
          jurisdiction_id: string | null
          season_open: string | null
          season_close: string | null
          season_notes: string | null
          min_size_inches: number | null
          max_size_inches: number | null
          slot_limit_min: number | null
          slot_limit_max: number | null
          bag_limit_per_person: number | null
          bag_limit_per_vessel: number | null
          possession_limit: number | null
          fishing_mode: 'shore' | 'private_boat' | 'for_hire' | 'all' | null
          effective_date: string
          expiry_date: string | null
          source_url: string
          last_verified_at: string
          notes: string | null
          created_at: string
          updated_at: string
        }
      }
      recipes: {
        Row: {
          id: string
          species_id: string | null
          title: string
          method: 'pan_sear' | 'grill' | 'ceviche' | 'bake' | 'fry' | 'smoke' | 'raw'
          ingredients: Json
          steps: Json
          cook_time_minutes: number | null
          is_raw_safe: boolean
          created_at: string
        }
      }
    }
  }
}
