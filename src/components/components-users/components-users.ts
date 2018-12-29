import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-users',
  templateUrl: 'components-users.html'
})
export class ComponentsUsersComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsUsersComponent Component');
    this.text = 'Hello World';
  }

}
