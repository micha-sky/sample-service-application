import { IPurchase } from 'app/shared/model/purchase.model';

export interface IProduct {
  id?: number;
  sku?: string;
  name?: string;
  skus?: IPurchase[];
}

export class Product implements IProduct {
  constructor(public id?: number, public sku?: string, public name?: string, public skus?: IPurchase[]) {}
}
