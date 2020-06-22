import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status:string;
  public token:string;
  public identity: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "IDENTIFICATE";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
   }

  ngOnInit(): void {
    //este objeto se ejucuta siempre pero cierra secion cuando se recibe por la url el numero uno
    this.logout();
  }

  onSubmit(form){
    this._userService.signup(this.user).subscribe(
      response => {
        //Token 
        if(response.status != 'error'){
          this.status = 'succcess';
          this.token = response;

          //objeto usuario identificado

          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;
              //Guardar datos en el local storage
              //persistir datos del usuario identificado
              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //Redirifir al inicio

              this._router.navigate(['inicio']);

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        }
        
      },

      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(
      params => {
        let logout = +params['sure'];

        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;

          //redirigir a inicio

          this._router.navigate(['inicio']);
        }
      }
    );
  }

}
