import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
  optionsQuantity: any;

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
      quantity: [this.item.quantity],
      amount: [this.item.amount, Validators.compose([Validators.required])],
      perishable: [this.item.perishable, Validators.compose([Validators.required])],
      validity: [{ value: this.item.validity, disabled: !this.item.perishable }],
      manufacturing: [this.item.manufacturing, Validators.compose([Validators.required])],
    });

    this.changeQuantityInput(this.item.measurementUnit);

  }

  getType(): void {
    if (this.route.snapshot.params.id) {
      this.type = 'Edição de Item';
      this.item = this.itemsArray.find(f => f.id === this.route.snapshot.params.id);
    } else {
      this.type = 'Cadastro de Item';
    }
  }

  letterOnly(event): boolean {
    const charCode = event.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8 || charCode === 32) {
      return true;
    }
    return false;
  }

  getValidity(): Date {
    if (this.itemForm.controls.validity.valid) {
      return this.itemForm.controls.validity.value;
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

  changeQuantityInput(measurement: measurementUnit): any {
    switch (measurement) {
      case measurementUnit.Liter:
      case measurementUnit.Kilogram:
        this.optionsQuantity = { prefix: '', thousands: '.', decimal: ',', align: 'left', precision: 3 };
        break;
      case measurementUnit.Unit:
      default:

        this.optionsQuantity = { prefix: '', thousands: '.', align: 'left', precision: 0 };
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
      const expired = moment().startOf('D') > moment(newItem.validity);
      if (expired) {
        Swal.fire({
          title: 'Ocorreu um erro ao salvar item',
          text: 'Item vencido.',
          icon: 'error'
        });
      } else if (newItem.validity && moment(newItem.manufacturing) > moment(newItem.validity)) {
        Swal.fire({
          title: 'Ocorreu um erro ao salvar item',
          text: 'Data de fabricação não pode ser maior que data de validade.',
          icon: 'error'
        });
      } else if (newItem.amount === 0) {
        Swal.fire({
          title: 'Ocorreu um erro ao salvar item',
          text: 'Preço não pode ser R$0,00',
          icon: 'error'
        });
      } else {
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
      }

    } else {
      this.itemForm.markAllAsTouched();
    }
  }

}
