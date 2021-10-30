import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { measurementUnit } from 'src/app/utils/consts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  itemForm: FormGroup;
  OptionsMeasurement = [];
  type: string;
  item: Item = new Item();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getType();
    this.getOptionsMeasurement();
  }

  initializeForm(): void {
    this.itemForm = this.formBuilder.group({
      name: [this.item.name, Validators.compose([Validators.required])],
      measurementUnit: [this.item.measurementUnit, Validators.compose([Validators.required])],
      quantity: [this.item.quantity, Validators.compose([Validators.required])],
      amount: [this.item.amount, Validators.compose([Validators.required])],
      perishable: [this.item.perishable, Validators.compose([Validators.required])],
      validity: [this.item.validity],
      manufacturing: [this.item.manufacturing, Validators.compose([Validators.required])],
    });

  }

  getType(): void {
    if (this.route.snapshot.params.id) {
      this.type = 'Edição de Item';
    } else {
      this.type = 'Cadastro de Item';
    }
  }

  getOptionsMeasurement(): void {
    this.OptionsMeasurement = [measurementUnit.Liter, measurementUnit.Kilogram, measurementUnit.Unit];
  }

  teste(): void {
    console.log(localStorage.getItem('itemsArray'));
  }

  changeQuantity(type: string): void {
    switch (type) {
      case 'remove':
        if (this.itemForm.controls.quantity.value > 0) {
          this.itemForm.controls.quantity.setValue(this.itemForm.controls.quantity.value - 1);
        }
        break;
      case 'add':
        this.itemForm.controls.quantity.setValue(this.itemForm.controls.quantity.value + 1);
        break;
      default:
        break;
    }
  }

  onChangePerishable(fieldChecked): void {
    if (fieldChecked) {
      this.itemForm.controls.validity.setValidators([Validators.required]);
      this.itemForm.controls.validity.updateValueAndValidity();
    } else {
      this.itemForm.controls.validity.clearValidators();
      this.itemForm.controls.validity.updateValueAndValidity();
    }
  }

  save(): void {
    if (this.itemForm.valid) {
      const newItem = new Item();
      newItem.prepareObj(this.itemForm.controls);
      const itemsArray: Array<Item> = JSON.parse(localStorage.getItem('itemsArray'));
      if (this.type === 'Cadastro de Item') {
        if (itemsArray) {
          itemsArray.push(newItem);
          localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
        } else {
          localStorage.setItem('itemsArray', JSON.stringify([newItem]));
        }
      }
      this.router.navigate(['']);
      Swal.fire({
        title: 'Item salvo com sucesso',
        icon: 'success'
      });
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

}
