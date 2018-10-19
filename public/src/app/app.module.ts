import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
