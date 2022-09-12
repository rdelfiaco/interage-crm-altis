import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  
  constructor( private router: Router, 
                private authService: AuthService ) { 

    this.authService.pageChose$.subscribe(pageChese_ => {
      console.log('pageChese_ ', pageChese_  )
      this.openPage(pageChese_ )
    })

  }




  ngOnInit(): void {

    

    //this.openPage(this.page)
  }

  openPage( page: string){

    console.log('nav ', page)
    if (page) this.router.navigate([page])

  }



  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.authService.setPageChose('')
  }

}
