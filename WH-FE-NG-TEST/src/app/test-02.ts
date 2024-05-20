// /**
//  * Update the following components to meet the requirements : 
//  * * Bind `field` of [textfield] component to its text input
//  * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
//  */
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'textfield',
    template: '<input type="text" [(ngModel)]="field" (ngModelChange)="fieldChanged()"/>'
})
export class TextField {
    field = "";
    @Output() fieldChange = new EventEmitter<string>();

    fieldChanged() {
        this.fieldChange.emit(this.field);
    }
}

@Component({
    selector: 'child-component',
    template: `<h2>Title:<h2><textfield (fieldChange)="updateTitle($event)"></textfield>`
})
export class ChildComponent {
    @Output() titleChange = new EventEmitter<string>();

    updateTitle(newTitle: string) {
        this.titleChange.emit(newTitle);
    }
}

@Component({
    selector: 'ng-app',
    template: `<div>
                    <child-component (titleChange)="title = $event"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {
    title: string = "";
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test02Component
            }
        ])
    ],
    declarations: [Test02Component, ChildComponent, TextField]
})
export class Test02Module {};
