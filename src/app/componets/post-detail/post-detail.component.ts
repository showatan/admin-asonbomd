import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [ PostService ]
})
 
export class PostDetailComponent implements OnInit {

  public page_title:string;
  public post:Post;
  public url;
  
  constructor(
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute 
  ) {
    this.page_title = "Detalle de la Entrada";
    this.url = global.url;
    
   }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    // SAcar el id de la url
    this._route.params.subscribe(
      params => {
        let id = +params['id']; 
 
        //Peticion Ajax
        this._postService.getPost(id).subscribe(
          response =>{
            if(response.status == 'succes'){
              this.post = response.post;
              console.log(response);
            }else{
              this._router.navigate(['/inicio']);
            }
          },
          error => {
            console.log(<any>error);
            this._router.navigate(['/inicio']);
          }
        );
      }
    );
  }

}
