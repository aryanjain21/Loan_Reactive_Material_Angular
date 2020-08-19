import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServicescustomvalidationService {

  constructor() { }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('([A-Z]){5}([0-9]){4}([A-Z]){1}$');
      const valid = regex.test(control.value);
      console.log(valid);
      return valid ? null : { invalidPan: true };
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex1 = new RegExp('/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/');
      const valid1 = regex1.test(control.value);
      console.log(valid1);
      return valid1 ? null : { invalidEmail: true };
    };
  }

  mobileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex1 = new RegExp('^[7-9][0-9]{9}$');
      const valid1 = regex1.test(control.value);
      console.log(valid1);
      return valid1 ? null : { invalidMobile: true };
    };
  }

  otpValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex1 = new RegExp('^[0-9]{4}$');
      const valid1 = regex1.test(control.value);
      console.log(valid1);
      return valid1 ? null : { invalidOtp: true };
    };
  }
}
