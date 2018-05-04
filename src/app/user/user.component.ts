import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  RedirectLogin(): void {
    this.router.navigate(['/login']);
  }
  RedirectSignUp(): void {
    this.router.navigate(['/signup']);
  }
  constructor(private router : Router) { }

  ngOnInit() {
  }

}
