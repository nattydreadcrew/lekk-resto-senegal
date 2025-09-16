export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
          name_english: string | null
          name_wolof: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          name_english?: string | null
          name_wolof?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          name_english?: string | null
          name_wolof?: string | null
        }
        Relationships: []
      }
      daily_specials: {
        Row: {
          available_date: string
          available_quantity: number | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          price: number
          remaining_quantity: number | null
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          available_date?: string
          available_quantity?: number | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          price: number
          remaining_quantity?: number | null
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          available_date?: string
          available_quantity?: number | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          price?: number
          remaining_quantity?: number | null
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_specials_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          price: number
          producer_id: string | null
          stock_quantity: number | null
          title: string
          unit: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          price: number
          producer_id?: string | null
          stock_quantity?: number | null
          title: string
          unit?: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          price?: number
          producer_id?: string | null
          stock_quantity?: number | null
          title?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cover_image_url: string | null
          created_at: string
          delivery_available: boolean | null
          display_name: string | null
          id: string
          location: string | null
          phone: string | null
          rating: number | null
          role: Database["public"]["Enums"]["user_role"]
          total_reviews: number | null
          updated_at: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string
          delivery_available?: boolean | null
          display_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          rating?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          total_reviews?: number | null
          updated_at?: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string
          delivery_available?: boolean | null
          display_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          rating?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      rando_events: {
        Row: {
          created_at: string
          created_by: string | null
          current_participants: number | null
          date: string
          description: string | null
          id: string
          location: string
          max_participants: number | null
          meeting_point: string
          meeting_time: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          current_participants?: number | null
          date: string
          description?: string | null
          id?: string
          location: string
          max_participants?: number | null
          meeting_point: string
          meeting_time: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          current_participants?: number | null
          date?: string
          description?: string | null
          id?: string
          location?: string
          max_participants?: number | null
          meeting_point?: string
          meeting_time?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rando_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      rando_images: {
        Row: {
          caption: string | null
          categories: string[] | null
          collection: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_featured: boolean | null
          is_free: boolean | null
          price: number | null
          rando_event_id: string | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          categories?: string[] | null
          collection?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_featured?: boolean | null
          is_free?: boolean | null
          price?: number | null
          rando_event_id?: string | null
          user_id: string
        }
        Update: {
          caption?: string | null
          categories?: string[] | null
          collection?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_featured?: boolean | null
          is_free?: boolean | null
          price?: number | null
          rando_event_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rando_images_rando_event_id_fkey"
            columns: ["rando_event_id"]
            isOneToOne: false
            referencedRelation: "rando_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rando_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string
          coordinates: unknown | null
          cover_image_url: string | null
          created_at: string
          cuisine_type: string | null
          delivery_available: boolean | null
          delivery_radius: number | null
          description: string | null
          email: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          name: string
          opening_hours: Json | null
          owner_id: string
          phone: string | null
          price_range: string | null
          rating: number | null
          total_reviews: number | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          address: string
          coordinates?: unknown | null
          cover_image_url?: string | null
          created_at?: string
          cuisine_type?: string | null
          delivery_available?: boolean | null
          delivery_radius?: number | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          opening_hours?: Json | null
          owner_id: string
          phone?: string | null
          price_range?: string | null
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          address?: string
          coordinates?: unknown | null
          cover_image_url?: string | null
          created_at?: string
          cuisine_type?: string | null
          delivery_available?: boolean | null
          delivery_radius?: number | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          opening_hours?: Json | null
          owner_id?: string
          phone?: string | null
          price_range?: string | null
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          producer_id: string | null
          product_id: string | null
          rating: number | null
          reviewer_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          producer_id?: string | null
          product_id?: string | null
          rating?: number | null
          reviewer_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          producer_id?: string | null
          product_id?: string | null
          rating?: number | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_demo_user: {
        Args: { user_email: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "photographer" | "member"
      user_role: "consumer" | "producer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "photographer", "member"],
      user_role: ["consumer", "producer", "admin"],
    },
  },
} as const
