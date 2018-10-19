import { Component, OnInit } from '@angular/core';
import { Product, HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  products: Product[]
  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute,
    private _router: Router
    ){}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    const fetchRequest = this._httpService.getProducts()
    fetchRequest.subscribe(response => {
      if (response['status'] == "success") {
        this.products = (response['data'] as Array<Object>)
        .map(data => new Product(data));
      }
    });
  }

  toEditPage(product: Product) {
    this._httpService.cache(product);
    this._router.navigate([product.id], {relativeTo: this._route});
  }

  deleteProduct(product: Product) {
    this._httpService.deleteProductById(product.id)
    .subscribe(() => {
      this.fetchProducts()
    })
  }

}
