import { Type } from '@angular/core';

export interface NavElement {
  id: string;
  componentElement: Type<any> | null; 
  inputsComponentElement: { [key: string]: any } | null;
}