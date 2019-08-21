import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPurchase } from 'app/shared/model/purchase.model';
import { AccountService } from 'app/core';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'jhi-purchase',
  templateUrl: './purchase.component.html'
})
export class PurchaseComponent implements OnInit, OnDestroy {
  purchases: IPurchase[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected purchaseService: PurchaseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.purchaseService
      .query()
      .pipe(
        filter((res: HttpResponse<IPurchase[]>) => res.ok),
        map((res: HttpResponse<IPurchase[]>) => res.body)
      )
      .subscribe(
        (res: IPurchase[]) => {
          this.purchases = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPurchases();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPurchase) {
    return item.id;
  }

  registerChangeInPurchases() {
    this.eventSubscriber = this.eventManager.subscribe('purchaseListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
