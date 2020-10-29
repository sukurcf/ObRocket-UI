import { ProcessBasketService } from './process-basket.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';

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
  item: string;
  available_product_codes: string[];
  entered_product_codes: string[] = [];
  products: ProductOrCoupon[];
  total: number;

  constructor(private processBasketService: ProcessBasketService) {}

  ngOnInit() {
    this.available_product_codes = ['CH1', 'AP1', 'CF1', 'MK1', 'OM1'];
    this.item = '';
    this.total = 0;
  }

  addProduct() {
    if (this.item !== '' && this.available_product_codes.includes(this.item)) {
      this.entered_product_codes.push(this.item);
      this.item = '';
      this.processBasketService
        .processBasket(this.entered_product_codes)
        .subscribe((data) => {
          this.products = data.basket_products;
          this.total = data.total;
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Cannot add item - ' + this.item,
        text: 'Item code is not in list of available items!',
      });
    }
  }
}
