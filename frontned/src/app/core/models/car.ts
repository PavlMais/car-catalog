import { Brand } from "./brand";
import { Color } from "./color";
import { Model } from "./model";

export interface Car {
  id: number
  description: string
  engineVolume: number
  brandId?: number
  modelId?: number
  colorId?: number
  brand?: Brand
  model?: Model
  color?: Color
  prices: any[]
}