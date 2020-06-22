import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public category: Category;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _UserServide: UserService,
    private _CategoryService: CategoryService
  ) {
    this.page_title = "Crear Nueva Categoria";
    this.identity = _UserServide.getIdentity();
    this.token = _UserServide.getToken();
    this.category = new Category(1, '');
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._CategoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == 'succes'){
          this.category = response.category;
          this.status = 'succes';

          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error'
        }
      },

      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

}
