import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Manufacturer, Medium, ManufacturerAttributes } from 'data-shape-ng';
import { MatChipInputEvent } from '@angular/material';
import { ManufacturerService } from '../manufacturer.service';
import { ActivatedRoute } from '@angular/router';
import { NameValuePair, DtoUtil, toDateInputValue } from 'jsonapi4angular';
import { ImageSelectorComponent } from 'jlbfields';
import { NameValueComponent } from 'jlbfields';


@Component({
  selector: 'app-manufacturer-create',
  templateUrl: './manufacturer-create.component.html',
  styleUrls: ['./manufacturer-create.component.css']
})
export class ManufacturerCreateComponent implements OnInit, OnChanges {
  manufacturerForm: FormGroup;

  @Input() manufacturer: Manufacturer;

  @ViewChild(ImageSelectorComponent)
  imageSelector: ImageSelectorComponent;

  @ViewChild(NameValueComponent)
  nameValuesComp: NameValueComponent;

  websites: NameValuePair[] = [];

  constructor(private manufacturerService: ManufacturerService,
     private route: ActivatedRoute,
     private fb: FormBuilder) {
    this.createForm();
    this.manufacturer = new Manufacturer(new ManufacturerAttributes());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.manufacturer) {
      const mo = DtoUtil.cloneAttributes(this.manufacturer.attributes);
      const wspairs: NameValuePair[] = [];
      const wss = this.manufacturer.attributes.websites || {};
      for (const key in wss) {
        if (wss.hasOwnProperty(key)) {
          const element = wss[key];
          wspairs.push({name: key, value: element});
        }
      }
      const d: Date = new Date(this.manufacturer.attributes.foundTime as number);
      mo.foundTime = toDateInputValue(d);
      delete mo.websites;
      this.manufacturerForm.reset(mo);
      // this.setWebsites(wspairs);
      this.imageSelector.imgUrl = mo.logo;
      this.setWebsites(this.manufacturer.attributes.websites);
    }
  }

  setWebsites(m: {[key: string]: string}): void {
    const nameValuePairs = [];
    if (m) {
      for (const key in m) {
        if (m.hasOwnProperty(key)) {
          nameValuePairs.push({name: key, value: m[key]});
        }
      }
    }
    this.websites =  nameValuePairs;
  }

  prepareSaveManufacturer(): ManufacturerAttributes {
    const formModel = this.manufacturerForm.value;
      // deep copy of form model lairs
      const websitepairsDeepCopy = formModel.websitepairs.map(
        (nvp: NameValuePair) => Object.assign({}, nvp)
      ).map((nvp) => {
        const o = {};
        o[nvp.name] = nvp.value;
        return o;
      });
      // return new `Hero` object containing a combination of original hero value(s)
      // and deep copies of changed form model values
      const saveManufacturer: ManufacturerAttributes = {
        // addresses: formModel.secretLairs // <-- bad!
        name: formModel.name,
        foundTime: formModel.foundTime,
        founder: formModel.founder,
        nationality: formModel.nationality,
        legend: formModel.legend,
        logo: this.imageSelector.imgUrl,
        slogan: formModel.slogan,
        websites: websitepairsDeepCopy as {[key: string]: string}
      };
      return saveManufacturer;
  }

  onSubmit() {
    this.manufacturer.attributes = this.prepareSaveManufacturer();
    this.manufacturerService.save(this.manufacturer).subscribe(singleBody => {
      console.log(singleBody);
    }, err => {
      console.log(err);
    });
    this.ngOnChanges(null);
  }

  createForm(): any {
    this.manufacturerForm = this.fb.group({
      name: '',
      foundTime: null,
      founder: '',
      nationality: '',
      legend: '',
      // logo: new FormControl({value: 'n/a', disabled: true}, Validators.required),
      slogan: '',
      websitepairs: this.fb.array([])
    });
  }

  ngOnInit() {
  }
}
