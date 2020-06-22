import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';  
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title:string;
  public identity;
  public token;
  public post: Post;
  public status: string;
  public categories;
  public resetVar = true;

  
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'post/upload',
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu Avatar'
    
};

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,

  ) {
    this.page_title = "Crea Una Nueva Entrada";
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
   }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub ,1,'','',null,null);
    this.getCategories();
    this.token = this._userService.getToken();
    //console.log(this.post);
  }

  getCategories(){
    this._categoryService.getCategory().subscribe(
      response => {
        if(response.status=='succes'){
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  imageUpload(datos){
    let data = JSON.parse(datos.response);
    this.post.image = data.image;
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'succes'){
          this.post = response.post;
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
