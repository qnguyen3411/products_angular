import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errors = {title: "", price: ""}
  productToPost = {title: "", price: "", imageUrl: ""}
  constructor(private _httpService: HttpService ,
    private _route: ActivatedRoute,
    private _router: Router
){}

  ngOnInit() {
  }

  postToServer() {
    this._httpService.createProduct(this.productToPost).subscribe(response => {
      if (response['status'] == "success") {
        this._router.navigate(['/products'])
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
