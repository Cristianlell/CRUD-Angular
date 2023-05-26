import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit, OnDestroy {
  id!: number;
  product!: IProducto;
  loading: boolean = false;
  routeSub!: Subscription;

  constructor(
    private _productService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
     this.routeSub = this.route.params.subscribe(data => {
      this.id = data['id'];
      this.getProduct(this.id);
    })
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe({
      next: (data) => {
        this.loading = false;
        this.product = data.body[0];
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
  }
}
