import { Component, OnInit } from '@angular/core';
import { Product, HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  errors = {title: "", price: ""}
  productToEdit: Product
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
){}

  ngOnInit() {
    this.productToEdit = this._httpService.getCached()
    if (!this.productToEdit) {
      this._router.navigate(['/products'])
    }
    console.log(this.productToEdit);
  }

  postUpdateToServer() {
    this._httpService.editProductById(
      this.productToEdit.id, this.productToEdit.productData())
    .subscribe(response => {
      if (response['status'] == "success") {
        this._router.navigate(['/products']);
      } else {
        for(let errMessage of response['data']) {
          if (errMessage['tag'] == "title") {
            this.errors.title = errMessage['message']
          }
          if (errMessage['tag'] == "price") {
            this.errors.price = errMessage['message']
          }
        }
      }
    })
  }

}
