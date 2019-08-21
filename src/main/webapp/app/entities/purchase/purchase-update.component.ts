import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPurchase, Purchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
  selector: 'jhi-purchase-update',
  templateUrl: './purchase-update.component.html'
})
export class PurchaseUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    userId: [],
    productSku: [],
    productSkus: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected purchaseService: PurchaseService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ purchase }) => {
      this.updateForm(purchase);
    });
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(purchase: IPurchase) {
    this.editForm.patchValue({
      id: purchase.id,
      userId: purchase.userId,
      productSku: purchase.productSku,
      productSkus: purchase.productSkus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const purchase = this.createFromForm();
    if (purchase.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseService.update(purchase));
    } else {
      this.subscribeToSaveResponse(this.purchaseService.create(purchase));
    }
  }

  private createFromForm(): IPurchase {
    return {
      ...new Purchase(),
      id: this.editForm.get(['id']).value,
      userId: this.editForm.get(['userId']).value,
      productSku: this.editForm.get(['productSku']).value,
      productSkus: this.editForm.get(['productSkus']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchase>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
