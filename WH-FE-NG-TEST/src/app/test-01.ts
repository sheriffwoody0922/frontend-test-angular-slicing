/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

@Component({
    selector: 'ng-app',
    template: `<div>
                    <h2>Loan Details</h2>
                    <label for="loanAmount">Loan Amount:</label>
                    <input type="number" id="loanAmount" [(ngModel)]="loan_amount" (ngModelChange)="onLoanAmountChange()">
                    <b>Monthly Payment:</b> {{ monthly_payment === 'N/A' ? 'N/A' : (monthly_payment | currency:'USD':'symbol') }} <br/>
                    <b>Late Payment Fee:</b> {{ late_payment === 'N/A' ? 'N/A' : (late_payment | currency:'USD':'symbol') }} <br/>
                </div>`
})
export class Test01Component {
    loan_amount: number = 1000;
    monthly_payment: any = 200; 
    late_payment: any = 10;    

    onLoanAmountChange(): void {
        if (this.loan_amount === 0 || this.loan_amount === null || this.loan_amount.toString().trim() === '') {
            this.monthly_payment = 'N/A';
            this.late_payment = 'N/A';
        } else {
            this.monthly_payment = (0.02 * this.loan_amount).toFixed(2);
            this.late_payment = (0.05 * parseFloat(this.monthly_payment)).toFixed(5);
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test01Component
            }
        ])
    ],
    declarations: [Test01Component]
})
export class Test01Module {}
