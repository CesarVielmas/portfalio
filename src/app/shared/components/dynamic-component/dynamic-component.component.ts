import { CommonModule } from '@angular/common';
import { Component,Input,ViewContainerRef,ComponentRef,ViewChild,AfterViewInit,OnChanges,SimpleChanges,OnDestroy,ComponentFactoryResolver,Type,ChangeDetectorRef,} from '@angular/core';

@Component({
  selector: 'dynamic-component',
  template: `<ng-container #container></ng-container>`,
  standalone: true
})
export class DynamicComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() componentType!: Type<any> | null;
  @Input() componentInputs: { [key: string]: any } = {};
  @ViewChild('container', { read: ViewContainerRef, static: true }) 
  private container!: ViewContainerRef;
  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.renderComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const componentTypeChanged = changes['componentType'] && !changes['componentType'].firstChange;
    const inputsChanged = changes['componentInputs'] && !changes['componentInputs'].firstChange;
    
    if (componentTypeChanged || inputsChanged) {
      if (componentTypeChanged) {
        this.renderComponent();
      } else if (inputsChanged && this.componentRef) {
        this.updateInputs();
      }
    }
  }

  private renderComponent(): void {
    this.container.clear();
    this.componentRef = null;

    if (!this.componentType) return;

    try {
      const factory = this.cfr.resolveComponentFactory(this.componentType);
      this.componentRef = this.container.createComponent(factory);
      this.updateInputs();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error creating dynamic component:', error);
    }
  }

  private updateInputs(): void {
    if (!this.componentRef || !this.componentInputs) return;
    Object.keys(this.componentInputs).forEach(key => {
      if (this.componentRef && key in this.componentRef.instance) {
        this.componentRef.instance[key] = this.componentInputs[key];
      }
    });
    if (this.componentRef) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}