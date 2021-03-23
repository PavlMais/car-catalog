import { Color } from "./color";

export interface CarFilter{
  priceFrom?: number 
  priceTo?: number 
  priceDate?: number 
  engineValue?: number 
  color?: Color 
}