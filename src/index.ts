// Essectial Import
import './sass/style.scss';
import React from 'react';

const app: Element | null = document.querySelector("#app");

type CalendarOptionsObject = {
  futureMonthCount?: number,
  pastMonthCount?: number,
};

class BasicCalendar {
  // Essential Date
  protected readonly date: Date = new Date();
  protected readonly month: number = this.date.getMonth();
  protected readonly year: number = this.date.getFullYear();
  // Current Date
  protected currentMonth: number = this.month;
  protected currentYear: number = this.year;
  // Calendar cell count, default is 42.
  protected readonly cellCount: number = 42;
  // Essential Settings
  protected futureMonthCount: number;
  protected pastMonthCount: number;

  constructor(protected classname?: string, options: CalendarOptionsObject = {}) {
    const defaultOptions: CalendarOptionsObject = {
      futureMonthCount: 1,
      pastMonthCount: 1,
    };
    // Use spread operator for default options
    const { futureMonthCount, pastMonthCount } = { ...defaultOptions, ...options };
    this.futureMonthCount = futureMonthCount!;
    this.pastMonthCount = pastMonthCount!;
  }

  renderCalendar(): boolean {
    if (this.classname) {
      const mainElement: Element | null = document.querySelector(this.classname);
      if (mainElement !== null) return true;
    }
    return false;
  }

  public createPanelBar(): Element {
    const panel = document.createElement("div");
    panel.classList.add("calendar-panel");
    return panel;
  }

  public createCalendarCell(): Element {
    const cell = document.createElement("div");
    return cell;
  }

  public createCalendarCellContainer(): Element {
    const cellContainer = document.createElement("div");
    return cellContainer;
  }

  public createCalendarFooter(): Element {
    const footer = document.createElement("div");
    return footer;
  }

  createMainContainer(): Element {
    const container = document.createElement("div");
    return container;
  }
}