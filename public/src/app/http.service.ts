import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  private productCache: Product[] = [];

  constructor(private _http: HttpClient){}

  getProducts() {
    return this._http.get('/api/products')
  }

  getProductById(id) {
    return this._http.get('/api/products/' + id)
  }

  createProduct(data) {
    return this._http.post('/api/products', data)
  }

  editProductById(id, data) {
    return this._http.put('/api/products/' + id, data);
  }

  deleteProductById(id) {
    return this._http.delete('/api/products/' + id)
  }

  cache(product: Product) {
    this.productCache.push(product);
  }

  getCached() {
    return this.productCache.pop();
  }
}

export class Product {
  id: string;
  title: string;
  price: number;
  imgUrl: string;

  constructor(data) {
    this.id = data['_id'];
    this.title = data['title'];
    this.price = data['price'] as number;
    this.imgUrl = data['imageUrl'] || "";
  }

  productData() {
    return {title: this.title, price: this.price, imageUrl: this.imgUrl}
  }
}