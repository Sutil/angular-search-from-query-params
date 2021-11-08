import { SearchService } from './search.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formGroup = this.fb.group({
    'email': '',
    'name': '',
  });

  dataList = [];

  constructor(private fb: FormBuilder, private service: SearchService) { }


  ngOnInit() {
    this.service.dataList.subscribe(dataList => {
      console.log('adasdf')
      this.dataList = dataList;
    }
    );

    this.service.formData.subscribe(formData => this.formGroup.patchValue(formData))
  }

  onSubmit() {
    this.service.updateSearch(this.formGroup.getRawValue());
  }

  clear() {
    this.formGroup.reset();
    this.onSubmit();
  }


}
