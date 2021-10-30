import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'senior-challenge';
  typeInScreen = null;
  typeInOptions = ['register', 'list'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private location: Location) { }

  ngOnInit(): void {
    const route = this.getRoute();
    this.selectOptionMenu(route);
  }

  getRoute(): string {
    const fullLocation = this.location.path();
    const route = fullLocation.substr(fullLocation.indexOf('/') + 1, fullLocation.length);
    return route;
  }

  selectOptionMenu(option: string): void {
    this.router.navigate([option]);
  }

  getTypeInScreen(): string {
    return this.typeInOptions.find(f => this.getRoute().indexOf(f) !== -1);
  }
}

