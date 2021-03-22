import { Color } from "./color";

export interface CarFilter{
  priceFrom: number | undefined
  priceTo: number | undefined
  priceDate: number | undefined
  engineValue: number | undefined
  color: Color | undefined
}