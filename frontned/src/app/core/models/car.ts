import { BrandInfo } from "./";
import { ColorInfo } from "./";
import { ModelInfo } from "./";
import { PriceInfo } from "./";

export interface CarNew {
  description: string
  engineVolume: number
  brandId: number
  modelId: number
  colorId: number
  prices: number
}
export interface CarInfo {
  id: number
  description: string
  engineVolume: number
  brand: BrandInfo
  model: ModelInfo
  color: ColorInfo
  prices: PriceInfo[]
}