import { IProduct } from './product';
import { Component, OnInit } from "@angular/core";
import { ProductService } from './product.service';

@Component({
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    // listFilter: string = "cart";

    _listFilter: string;
    public get listFilter() : string {
        return this._listFilter;
    }
    public set listFilter(value : string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
        // this.listFilter = "cart";
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log("In OnInit");
        // this.products = this.productService.getProducts();
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products,
                this.filteredProducts = this.products;
            },
            // error: err => this.errorMessage = err
            // next(products) { 
            //     this.products = products,
            //     this.filteredProducts = this.products;}, // doesn´t work.... don´t know why
            error(err) { this.errorMessage = err }
        });
        
    }

    onRatingClicked(message: string): void {
        this.pageTitle = "Product List: " + message;
        console.log("Notify trigger");
    }
}