export type SchemaProperty = {
  type: string;
  description?: string;
  properties?: Record<string, SchemaProperty>;
  items?: {
    type: string;
    properties?: Record<string, SchemaProperty>;
    description?: string;
    items?: SchemaProperty;
  };
  format?: string;
  pattern?: string;
};

export type FormData = {
  [key: string]: any;
};

export type FormValue = string | number | boolean | null | FormValue[] | { [key: string]: FormValue };