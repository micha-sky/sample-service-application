import { NgModule } from '@angular/core';

import { ProductsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ProductsSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ProductsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ProductsSharedCommonModule {}
