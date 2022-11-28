import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, finalize, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AttributesService } from '@src/app/services/attributes.service';
import { DeleteDialogComponent } from '@pages/candidate-detail/candidate-communications/communication-comment/delete-dialog/delete-dialog.component';
import { Attribute, AttributeType, PREDEFINED_TYPES } from '@src/app/models/attributeType';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit, OnDestroy {
  public attributes!: Attribute[];

  public inProgress: boolean = false;

  public isCreate: boolean = false;

  private subscription!: Subscription;

  VOForm!: FormGroup;

  public displayedColumns: string[] = [
    'id',
    'name',
    'title',
    'icon',
    'type',
    'validation',
    'identifier',
    'multivalued',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  public types: AttributeType[] = PREDEFINED_TYPES;

  constructor(
    private attributeService: AttributesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });

    this.fillAllAttributesGrid();
  }

  public fillAllAttributesGrid(): void {
    this.subscription = this.attributeService
      .getAllAttributes()
      .subscribe((attributes: Attribute[]) => {
        this.attributes = attributes;

        this.initForm(attributes);
      });
  }

  public initForm(attributes: Attribute[]): void {
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        attributes.map((val) =>
          this.fb.group({
            id: new FormControl(val.id),
            name: new FormControl(val.name, Validators.required),
            label: new FormControl(val.label, Validators.required),
            icon: new FormControl(val.icon, Validators.required),
            basicType: new FormControl(val.basicType, Validators.required),
            validation: new FormControl(val.validation, Validators.required),
            isIdentifier: new FormControl(val.isIdentifier),
            isMultivalued: new FormControl(val.isMultivalued),
            isEdit: new FormControl(false),
          })
        )
      ),
    });

    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
  }

  public onAttributeSave(element: FormGroup): void {
    this.validateAllFormFields(element);

    if (element.invalid) {
      return;
    }

    if (element.getRawValue().id) {
      this.attributeService
        .updateAttribute(element.getRawValue().id, element.getRawValue())
        .subscribe();
    } else {
      this.attributeService.createAttribute(element.getRawValue()).subscribe(() => {
        this.fillAllAttributesGrid();
      });
      this.isCreate = false;
    }
  }

  public addRow(): void {
    if (this.isCreate) {
      return;
    }

    const newRow = this.fb.group({
      id: new FormControl(''),
      basicType: new FormControl('', Validators.required),
      isIdentifier: new FormControl(false),
      isMultivalued: new FormControl(false),
      name: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      validation: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
      isEdit: new FormControl(true),
    });

    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, newRow);
    this.dataSource = new MatTableDataSource(control.controls);

    this.isCreate = true;
  }

  public removeRow(id: number | undefined): void {
    this.attributes = this.attributes.filter((u: Attribute) => u.id !== id);
  }

  public onCancel(id: number | undefined): void {
    if (!id) {
      this.attributes = this.attributes.filter((u: Attribute) => !!u.id);
      this.isCreate = false;
    }
  }

  public openDialog($event: Event, element: Attribute): void {
    this.inProgress = true;

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete attribute',
        text: `Are you sure you want to delete ${element.name} attribute?`,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((response: boolean) => response),
        finalize(() => {
          this.inProgress = false;
        })
      )
      .subscribe(() => {
        this.attributeService.deleteAttribute(element.id!).subscribe(() => {
          this.removeRow(element.id);
        });
      });

    $event.preventDefault();
  }

  public onEdit(element: FormGroup): void {
    // eslint-disable-next-line no-param-reassign
    element.get('isEdit')?.setValue(!element.get('isEdit')?.value);
  }

  private validateAllFormFields(element: FormGroup): void {
    Object.keys(element.controls).forEach((field) => {
      const control = element.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
