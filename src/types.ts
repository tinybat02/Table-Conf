import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  lists: string;
}

export const defaults: PanelOptions = {
  lists: '',
};

interface Buffer extends Vector {
  buffer: { [key: string]: any };
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}
