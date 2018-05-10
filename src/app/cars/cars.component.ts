import {AfterViewInit,ViewChild, Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Car } from '../car';
import { CarService} from '../car.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class CarsComponent implements OnInit, AfterViewInit{
  cars: Car[];
  getCars(): void {
    this.carService.getCars()
      .subscribe(data => this.cars = data);
  }
  displayedColumns = ['img','name', 'marca', 'category', 'description', 'CV','userId'];
  dataSource= new MatTableDataSource();
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }
  rowClicked(row: any): void {
    this.router.navigate(['/detail/'+row._id]);
  }
  getImg(path){
    return this.domSanitizer.bypassSecurityTrustResourceUrl('data:'+path.filetype+';base64,'
      + path.data);
  }
  owner(id){
    if(id==localStorage.getItem('user_id')){
      return true;
    }
    else{
      return false;
    }
  }
  constructor(public domSanitizer: DomSanitizer,private carService: CarService,private router : Router) { }
  ngOnInit() {
    this.carService.getCars()
      .subscribe(data => {
        this.dataSource.data = data;
      });
    this.getCars();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

