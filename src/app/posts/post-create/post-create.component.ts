import {Component, OnInit} from '@angular/core';
import { ApiService } from '../../api.service';
import { Product } from '../../products';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent implements OnInit {
  displayedColumns: string[] = ['productType', 'Make', 'Price', 'AddToCart', 'ViewProd'];
  dataSource: Product[] = [];
  isLoadingResults = true;
  selectedItems  = [];
  form: FormGroup;
  theCheckbox = false;
  prods = [];
  product: Product = { _id: '', productType: '', Make: '', Price: null, Model: null };
  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    const controls = this.dataSource.map(c => new FormControl(false));
    this.form = this.formBuilder.group({
      prods: this.initial(),
      ctrl: controls
    });
  }
  initial() {
    this.api.getProducts()
    .subscribe(res => {
      this.isLoadingResults = false;
      this.dataSource = res;

      return res;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  getProduct(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
        this.isLoadingResults = false;
      });
  }
  isSelected(value: any, event): object {
    if (event.checked) {
      console.log('LEN when checked -- ' + this.selectedItems.length);
      this.selectedItems.push(value);
    } else {

      console.log('PROD ID ' + value._id + 'with product type -- ' + value.productType + 'removing');
      console.log(this.selectedItems.filter(c =>
        (c._id === value._id)));
        const elem = this.selectedItems.findIndex(x => (x._id === value._id));
          console.log('INDEX: ' + elem);
        this.selectedItems.splice(elem, 1);
        console.log('after remove -- >');
        console.log(this.selectedItems);
    }
    this.submit(null);

    return value;
  }

  ngOnInit() {
    this.api.getProducts()
      .subscribe(res => {
        this.dataSource = res;
        console.log('DATA SOURCE --> ' + this.dataSource);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  submit(form) {
    let bill = 0;
    let prodList = '';
    this.selectedItems.forEach(e => {
      bill = bill + e.Price;
      console.log('SELECTED PRODUCT IDs ' + e._id + '' + e.Price);

    });
    console.log('Your Bill amount is ' + bill);
    this.selectedItems.forEach(e => {
      prodList = prodList + '<li>' + e.productType + 'Price : ' + e.Price + '</li>';
      this.getProduct(e._id);
    }
      );
    document.getElementById('cartContent').innerHTML = '<ul>' + prodList + '</ul>' + '<p>' + 'Your Bill amount is '+ bill +'</p>';

}

}
