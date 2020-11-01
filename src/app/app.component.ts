import { ProcessBasketService } from './process-basket.service';
import { Component } from '@angular/core';

export interface ProductOrCoupon {
  type: string;
  price: number;
  code: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ObRocket-UI';
  currentItem: string;
  available_item_codes: string[];
  entered_item_codes: string[] = [];
  items: ProductOrCoupon[];
  total: number;

  constructor(private processBasketService: ProcessBasketService) {}

  ngOnInit() {
    this.available_item_codes = ['CH1', 'AP1', 'CF1', 'MK1', 'OM1'];
    this.currentItem = '';
    this.total = 0;
  }

  addItem() {
    if (
      this.currentItem !== '' &&
      this.available_item_codes.includes(this.currentItem)
    ) {
      this.entered_item_codes.push(this.currentItem);
      this.currentItem = '';
      this.processBasketService
        .processBasket(this.entered_item_codes)
        .subscribe((data) => {
          this.items = data.basket_products;
          this.total = data.total;
        });
    } else {
      alert(
        this.currentItem +
          ' information is not available. Unable to add to list.'
      );
    }
  }

  deleteItem(item) {
    if (this.entered_item_codes.includes(item)) {
      let index = this.entered_item_codes.indexOf(item);
      this.entered_item_codes.splice(index, 1);
      this.processBasketService
        .processBasket(this.entered_item_codes)
        .subscribe((data) => {
          this.items = data.basket_products;
          this.total = data.total;
        });
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
