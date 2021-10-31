import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { measurementUnit } from 'src/app/utils/consts';
import { measurementAbbreviation } from 'src/app/utils/methods';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'amount', 'perishable', 'validity', 'manufacturing', 'actions'];
  itemsArray: Array<Item> = [];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.prepareDataSource();
  }

  prepareDataSource(): void {
    this.itemsArray = JSON.parse(localStorage.getItem('itemsArray'));
    if (this.itemsArray) {
      this.dataSource = new MatTableDataSource(this.itemsArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  measurementAbbreviation(measurement: measurementUnit): string {
    return (measurementAbbreviation(measurement));
  }

  decimalSeparator(amount: string): string {
    const withoutComma = amount.replace(/\,/gi, 'c');
    const withoutDot = withoutComma.replace(/\./gi, 'd');
    const changedComma = withoutDot.replace(new RegExp('c', 'gi'), '.');
    const changedDot = changedComma.replace(new RegExp('d', 'gi'), ',');
    return changedDot;
  }

  newRegister(): void {
    this.router.navigate(['register']);
  }

  edit(id: string): void {
    this.router.navigate([`register/${id}`]);
  }

  remove(id: string): void {
    Swal.fire({
      title: 'Tem certeza que deseja excluir item?',
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(x => {
      if (x.value) {
        this.itemsArray.splice(this.itemsArray.findIndex(f => f.id === id), 1);
        localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
        this.prepareDataSource();
      }
    });
  }

}
