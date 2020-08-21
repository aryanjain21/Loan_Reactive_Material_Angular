import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicescustomvalidationService } from '../servicescustomvalidation.service';
import { DataService } from '../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { OtpComponent } from './otp/otp.component';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})

export class VerifyComponent implements OnInit {

  regForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private customValidator: ServicescustomvalidationService,
    private service: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      city: ['', Validators.required],
      panNumber: ['', [Validators.required, this.customValidator.patternValidator()]],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      mobile: ['', [Validators.required, this.customValidator.mobileValidator()]]
    });
  }

  get formData() {
    return this.regForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.regForm.valid)
    console.log(this.regForm.value.mobile)
    if (this.regForm.valid) {
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      // console.table(this.regForm.value);
      let observableResult = this.service.insertUserDetails(this.regForm.value);
      observableResult.subscribe((result: any) => {
        console.log(result);
        result.status == "Success" ? this.getModal() : alert("Invalid form");
        // this.flag ? this.getModal() : alert("Invalid form");
      }, error => {
        alert("error" + error);
      });
    }
    else {
      alert("Invalid form");
    }
  }

  getModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(OtpComponent, dialogConfig);
  }


}
