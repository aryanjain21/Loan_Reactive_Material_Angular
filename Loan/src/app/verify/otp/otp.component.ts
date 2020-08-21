import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ServicescustomvalidationService } from 'src/app/servicescustomvalidation.service';
import { DataService } from 'src/app/data.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  form: FormGroup;
  resendCounter = 0;
  value = "false";

  constructor(private formBuilder: FormBuilder, private customValidator: ServicescustomvalidationService,
    private service: DataService, public dialogRef: MatDialogRef<OtpComponent>, private dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      $key: new FormControl(null),
      mobile: ['', [Validators.required, this.customValidator.mobileValidator()]],
      otp: ['', [Validators.required, this.customValidator.otpValidator()]]
    });
  }

  get otpFormData() {
    return this.form.controls;
  }

  close() {
    this.dialogRef.close();
  }

  resendOtp() {
    // let resendBtn = event.target;
    // resendBtn.setAttribute("disabled", "true");
    this.value = "true"
    ++this.resendCounter;
    console.log(this.resendCounter);
    if (this.resendCounter < 3) {
      console.log("hhhhhhh")
      setTimeout(() => {
        console.log("kkkk")
        this.value = "false";
        // resendBtn.removeAttribute("disabled");
        console.log(this.resendCounter);
      }, 180000)
    }
    else if (this.resendCounter === 3) {
      alert("Please try again after an hour.");
      // resendBtn.setAttribute("disabled", "true");
      this.dialogRef.close();
    }
  }

  wasFormChanged = false;
  formChanged() {
    this.wasFormChanged = true;
  }

  getOtp() {
    //console.log(this.user['mobile']);
    console.log(this.form.value);
    console.log(this.otpFormData.otp);
    if (this.form.valid == true) {
      let observableResult = this.service.insertOtpDetails(this.form.value);
      console.log(observableResult);
      observableResult.subscribe((result: any) => {
        console.log(result);

        if (result.status == "Success") {
          alert(`Thank you for verification ${this.form.value.mobile}`)
          this.form.reset();
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          this.dialogRef.close();
        }
      }, error => {
        alert("error" + error);
      });
    } else {
      alert("Invalid OTP");
    }
  }

}
