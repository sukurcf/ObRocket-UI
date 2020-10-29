import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductOrCoupon } from './app.component';

interface ProcessResponse {
  basket_products: ProductOrCoupon[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProcessBasketService {
  process_basket_url = 'http://127.0.0.1:5000/process_basket';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
    }),
  };
  constructor(private http: HttpClient) {}

  processBasket(listOfProducts: string[]) {
    return this.http.post<ProcessResponse>(
      this.process_basket_url,
      {
        list_of_products: listOfProducts,
      },
      this.httpOptions
    );
  }
}
