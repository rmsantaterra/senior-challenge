import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('OOI');
  }

  teste(): void {
    console.log('OOIII');
    this.router.navigate(['registerItems']);
  }

}
