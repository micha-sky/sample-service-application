import { IProduct } from 'app/shared/model/product.model';

export interface IPurchase {
  id?: number;
  userId?: number;
  productSku?: string;
  productSkus?: IProduct[];
}

export class Purchase implements IPurchase {
  constructor(public id?: number, public userId?: number, public productSku?: string, public productSkus?: IProduct[]) {}
}
