import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ProductsSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ProductsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsSharedModule {
  static forRoot() {
    return {
      ngModule: ProductsSharedModule
    };
  }
}
