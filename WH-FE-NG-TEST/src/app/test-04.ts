/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-app',
    template: `
                <h2>Enter your first and last name</h2>
                <div>
                    <input type="text" [(ngModel)]="firstName" (blur)="generateUsername()" placeholder="First Name">
                    <input type="text" [(ngModel)]="lastName" (blur)="generateUsername()" placeholder="Last Name">
                    <p *ngIf="username">Generated Username: {{ username }}</p>
                </div>
                `,
    styles: []
})
export class UserNameComponent {
    firstName: string;
    lastName: string;
    username: string;

    generateUsername() {
        if (this.firstName && this.lastName) {
            const randomInt = Math.floor(Math.random() * 9) + 1;
            this.username = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${randomInt}`;
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: UserNameComponent
            }
        ]),
        FormsModule // Make sure to import FormsModule here
    ],
    declarations: [UserNameComponent]
})
export class UserNameModule {};
