import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);

  products: Iproducts[] = [];
  categories: Icategory[] = [];

  customMainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay:true,
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  getAllProducvts(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategoryData(): void {
    this._categoriesService.gatAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {},
    });
  }
  ngOnInit(): void {
    this.getAllProducvts();
    this.getCategoryData();
  }
}
