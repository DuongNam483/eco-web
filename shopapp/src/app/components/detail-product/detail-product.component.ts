import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { response } from 'express';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  constructor(private productService: ProductService){

  }
  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   debugger;
  //   const idParam = 5;
  //   if(idParam !== null){
  //     this.productId = + idParam;
  //   }
  //   if(!isNaN(this.productId)){
  //     this.productService.getDetailProduct(this.productId).subscribe({
  //       next: (response: any) => {
  //         //Lấy danh sách ảnh sản phẩm và thay đổi url
  //         if( response.productI)

  //     })
  //   }
  // }
}
