import { Component, input, output, computed, model, effect } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { LocalStorage } from '../../servises/LocalStorage.service';



@Component({
  selector: 'my-data-selector',
  template: `
    <div class="">
      <div class="h-50 bg-primary-subtle position-relative d-flex justify-content-center">
        <div class="bg-emphasis h-100 rounded-top-4 ">
          <ul class="nav nav-tabs rounded-top-4">
            <li class="nav-item bg-emphasis ">
              <a class="nav-link">День</a>
            </li>
            <li class="nav-item bg-emphasis">
              <a class="nav-link">Месяц</a>
            </li>
            <li class="nav-item bg-emphasis">
              <a class="nav-link">Link</a>
            </li>
            <li class="nav-item bg-emphasis ">
              <a class="nav-link">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="h-50 bg-emphasis" ></div>
    </div>

    <style>
      .w-3{
        width: 300px;
      }
    </style>
  `,
  imports: [ SelectableDirective ],
  providers: [],
})
export class DataSelector {
  constructor(localStorage: LocalStorage) { }

}
