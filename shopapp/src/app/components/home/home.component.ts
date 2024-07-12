import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { environment } from '../../enviroments/enviroment';
import { max } from 'class-validator';
import { Category } from '../../models/category';
import { ApiResponse } from '../../responses/api.response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];
  categories: Category[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string="";
  selectedCategoryId: number = 0;


  constructor(private productService: ProductService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories(1, 100)

  }

  getCategories(page: number, limit: number){
    this.categoryService.getCategories(page, limit).subscribe({
      next: (apiresponse: ApiResponse) => {
        debugger;
        this.categories = apiresponse.data;
      },
      complete:()=>{
        debugger;
      },
      error:(error: any) => {
        debugger;
        console.log('Lỗi: ', error);
      }
    })
  }

  searchProducts(){
    this.currentPage = 1;
    this.itemsPerPage = 12;
    debugger;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage)
  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    debugger;
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (apiresponse: ApiResponse) => {
        debugger;
        const response = apiresponse.data;
        console.log(apiresponse);
        response.products.forEach((product: Product) => {
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray (this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.log('Lỗi: ', error);
      }
    });
  }
  // getProducts(keyword:string, selectedCategoryId:number, page: number, limit: number){
  //   debugger;
  //   this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
  //     next: (apiresponse: ApiResponse) => {
  //       debugger;
  //       // console.log("Response received:", response);

  //       // // response.product.forEach((product: Product) => {
  //       // //   product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
  //       // // });
  //       // // this.products = [];
  //       // response.productResponses.forEach((productResponse: any) => {
  //       //     // Làm trống mảng products trước khi thêm sản phẩm của trang mới
  //       //   const product: Product = {
  //       //     id: productResponse.id,
  //       //     name: productResponse.name,
  //       //     price: productResponse.price,
  //       //     description: productResponse.description,
  //       //     category_id: productResponse.categoryId,
  //       //     thumbnail: productResponse.thumbnail,
  //       //     url: `${environment.apiBaseUrl}/products/images/${productResponse.thumbnail}`,

  //       //   };
  //       //   this.products.push(product);
  //       // });
  //       // this.totalPages = response.totalPages;
  //       // this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
  //       const response = apiresponse.data;
  //         response.products.forEach((product: Product) => {
  //           product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
  //         });
  //         this.products = response.products;
  //         this.totalPages = response.totalPages;
  //         this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
  //     },

  //     complete: () => {
  //       debugger;
  //     },
  //     error:(error: any) => {
  //       debugger;
  //       console.log('Lỗi: ', error);
  //     }
  //   })
  // }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages -1, totalPages);

    if(endPage - startPage < maxVisiblePages){
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index)
  }
}
