import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { measurementUnit } from 'src/app/utils/consts';
import { measurementAbbreviation } from 'src/app/utils/methods';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  itemForm: FormGroup;
  OptionsMeasurement = [];
  itemsArray: Array<Item> = [];
  type: string;
  item: Item = new Item();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemsArray = JSON.parse(localStorage.getItem('itemsArray'));
    this.getType();
    this.initializeForm();
    this.getOptionsMeasurement();
  }

  initializeForm(): void {
    this.itemForm = this.formBuilder.group({
      name: [this.item.name, Validators.compose([Validators.required])],
      measurementUnit: [this.item.measurementUnit, Validators.compose([Validators.required])],
      quantity: [this.item.quantity, Validators.compose([Validators.required])],
      amount: [this.item.amount, Validators.compose([Validators.required])],
      perishable: [this.item.perishable, Validators.compose([Validators.required])],
      validity: [{ value: this.item.validity, disabled: !this.item.perishable }],
      manufacturing: [this.item.manufacturing, Validators.compose([Validators.required])],
    });

  }

  getType(): void {
    if (this.route.snapshot.params.id) {
      this.type = 'Edição de Item';
      this.item = this.itemsArray.find(f => f.id === this.route.snapshot.params.id);
    } else {
      this.type = 'Cadastro de Item';
    }
  }

  getOptionsMeasurement(): void {
    this.OptionsMeasurement = [measurementUnit.Liter, measurementUnit.Kilogram, measurementUnit.Unit];
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

  measurementAbbreviation(measurement: measurementUnit): string {
    return (measurementAbbreviation(measurement));
  }

  changeQuantityInput(measurement: measurementUnit): void {
    const quantity = this.itemForm.controls.quantity.value ?
      this.itemForm.controls.quantity.value.toString() : '';
    let separator;
    if (quantity.indexOf('.') !== -1) {
      separator = '.';
    } else if (quantity.indexOf(',') !== -1) {
      separator = ',';
    }
    switch (measurement) {
      case measurementUnit.Liter:
      case measurementUnit.Kilogram:
        const beforeSeparator = quantity.split(separator)[0];
        const afterSeparator = quantity.split(separator)[1];
        if (afterSeparator) {
          afterSeparator.substring(0, 3);
          this.itemForm.controls.quantity.setValue(`${Number(beforeSeparator)}${separator}${Number(afterSeparator.substring(0, 3))}`);
        }
        break;
      case measurementUnit.Unit:
        if (separator) {
          this.itemForm.controls.quantity.setValue(`${Number(quantity.split(separator)[0])}`);
        }
        break;
      default:
        break;
    }
  }

  onChangePerishable(fieldChecked): void {
    if (fieldChecked) {
      this.itemForm.controls.validity.enable();
      this.itemForm.controls.validity.setValidators([Validators.required]);
      this.itemForm.controls.validity.updateValueAndValidity();
    } else {
      this.itemForm.controls.validity.disable();
      this.itemForm.controls.validity.setValue(null);
      this.itemForm.controls.validity.clearValidators();
      this.itemForm.controls.validity.updateValueAndValidity();
    }
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  save(): void {
    if (this.itemForm.valid) {
      const newItem = new Item();
      newItem.prepareObj(this.itemForm.controls);
      if (this.type === 'Cadastro de Item') {
        if (this.itemsArray) {
          this.itemsArray.push(newItem);
          localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
        } else {
          localStorage.setItem('itemsArray', JSON.stringify([newItem]));
        }
        Swal.fire({
          title: 'Item salvo com sucesso',
          icon: 'success'
        });
      } else {
        const indexEdit = this.itemsArray.findIndex(f => f.id === this.route.snapshot.params.id);
        this.itemsArray[indexEdit] = newItem;
        localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
        Swal.fire({
          title: 'Item cadastrado com sucesso',
          icon: 'success'
        });
      }
      this.router.navigate(['']);

    } else {
      this.itemForm.markAllAsTouched();
    }
  }

}
