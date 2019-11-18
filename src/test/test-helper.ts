import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class TestHelper {
  static getElement(componentElement: DebugElement, cssSelector: string, failOnNotFound = false): DebugElement {
    const ele = componentElement.query(By.css(cssSelector));
    if (!ele && failOnNotFound) {
      fail(`Element with selector ${cssSelector} does not exist`);
      return;
    }
    return ele;
  }

  static getElementText(componentElement: DebugElement, cssSelector: string): string {
    const ele = TestHelper.getElement(componentElement, cssSelector, true);

    return ele.nativeElement.textContent;
  }

  static clickElement(componentElement: DebugElement, cssSelector: string): void {
    const ele = TestHelper.getElement(componentElement, cssSelector, true);

    ele.nativeElement.click();
  }

  static setInputValue(componentElement: DebugElement, cssSelector: string, value: any): void {
    const ele = TestHelper.getElement(componentElement, cssSelector, true);

    ele.nativeElement.value = value;
    ele.nativeElement.dispatchEvent(new Event('input'));
  }

  static async whenStable(fixture: any, count: number): Promise<void> {
    for (let i = 0; i < count; ++i) {
      await fixture.whenStable();
    }
    fixture.detectChanges();
  }
}
