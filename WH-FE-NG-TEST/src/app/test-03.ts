/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-app',
    template: `
    <form (submit)="onSubmit(emailInput.value, passwordInput.value, $event)">
        <h2>Login</h2>
        <br/>
        <input type="email" name="email" #emailInput />
        <div *ngIf="emailError">{{emailError}}</div>
        <br/>
        <input type="password" name="password" #passwordInput />
        <div *ngIf="passwordError">{{passwordError}}</div>
        <button type="submit">Submit</button>
        <br/><br/>
        <div *ngIf="logged_in">Logged In!</div>
    </form>
    `,
    styles: []
})
export class Test03Component {
    logged_in = false;
    emailError: string | null = null;
    passwordError: string | null = null;

    validateEmail(email: string): boolean {
        const regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            this.emailError = 'Invalid email format. Email should end with @a.com';
            return false;
        }
        this.emailError = null;
        return true;
    }

    validatePassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regex.test(password)) {
            this.passwordError = 'Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long';
            return false;
        }
        this.passwordError = null;
        return true;
    }

    onSubmit(email: string, password: string, event: Event): void {
        event.preventDefault(); // Prevent form submission
        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            this.logged_in = true;
        } else {
            this.logged_in = false;
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "", component: Test03Component }
        ])
    ],
    declarations: [Test03Component]
})
export class Test03Module {}
