import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewEncapsulation, Renderer } from "@angular/core";
import { IMyDate, IMyDateRange, IMyMonth, IMyWeek, IMyDayLabels, IMyMonthLabels, IMyOptions } from "./interfaces/index";
import { LocaleService } from './services/my-date-picker.locale.service';
import { ValidatorService } from './services/my-date-picker.validator.service';
import * as moment from 'moment';
/*
declare var require: any;
const myDpStyles: string = require("./my-date-picker.component.css");
const myDpTpl: string = require("./my-date-picker.component.html");
*/

@Component({
    selector: "my-date-picker",
    styles: [`.mydp .headertodaybtn,.mydp .selection,.mydp .weekdaytitle{overflow:hidden;white-space:nowrap}.mydp{min-width:100px;border-radius:2px;line-height:1.1;display:inline-block;position:relative}.mydp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.mydp .selector{margin-top:2px;margin-left:-1px;position:absolute;width:252px;padding:1px;border-radius:2px;background-color:#CCC;z-index:100;animation:selectorfadein .1s}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.mydp .selectorarrow{background:#FAFAFA;border:1px solid #CCC;margin-top:12px;padding:0}.mydp .selectorarrow:after,.mydp .selectorarrow:before{bottom:100%;border:solid transparent;content:" ";height:0;width:0;position:absolute}.mydp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FAFAFA;border-width:10px;margin-left:-10px}.mydp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.mydp .selectorarrowleft:after,.mydp .selectorarrowleft:before{left:24px}.mydp .selectorarrowright:after,.mydp .selectorarrowright:before{left:224px}.mydp .alignselectorright{right:-1px}.mydp .selectiongroup{position:relative;display:table;border:none;border-spacing:0;background-color:#FFF}.mydp .selection{background-color:#FFF;display:table-cell;position:absolute;width:100%;font-weight:700;text-overflow:ellipsis;text-align:center}.mydp .invaliddate,.mydp .invalidmonth,.mydp .invalidyear{background-color:#F1DEDE}.mydp ::-ms-clear{display:none}.mydp .headerbtncell,.mydp .selbtngroup{display:table-cell;vertical-align:middle}.mydp .selbtngroup{position:relative;white-space:nowrap;width:1%;font-size:0}.mydp .btnclear,.mydp .btnpicker{height:100%;width:30px;border:none;border-left:1px solid #CCC;padding:0;outline:0;font:inherit;-moz-user-select:none}.mydp .btnclearenabled,.mydp .btnpickerenabled,.mydp .headertodaybtnenabled{cursor:pointer}.mydp .btncleardisabled,.mydp .btnpickerdisabled,.mydp .headertodaybtndisabled{cursor:not-allowed}.mydp .btnclear,.mydp .btnpicker,.mydp .headertodaybtn{background:#FFF}.mydp .header{width:100%;height:30px;background-color:#FAFAFA}.mydp .header td{vertical-align:middle;border:none;line-height:0}.mydp .header td:nth-child(1){padding-left:4px}.mydp .header td:nth-child(2){text-align:center}.mydp .header td:nth-child(3){padding-right:4px}.mydp .caltable{table-layout:fixed;width:100%;background-color:#FFF;font-size:14px}.mydp .caltable,.mydp .daycell,.mydp .weekdaytitle{border-collapse:collapse;color:#036;line-height:1.1}.mydp .daycell,.mydp .weekdaytitle{padding:5px;text-align:center}.mydp .weekdaytitle{background-color:#DDD;font-size:12px;font-weight:700;vertical-align:middle;max-width:36px}.mydp .daycell{cursor:pointer;height:30px}.mydp .daycell div{background-color:inherit;vertical-align:middle}.mydp .daycell div span{vertical-align:middle}.mydp .inlinedp{position:relative;margin-top:-1px}.mydp .nextmonth,.mydp .prevmonth{color:#CCC}.mydp .disabled{cursor:default!important;color:#CCC!important;background:#FBEFEF!important}.mydp .sunday{color:#C30000}.mydp .sundayDim{opacity:.5}.mydp .currmonth{background-color:#F6F6F6;font-weight:700}.mydp .currday{text-decoration:underline}.mydp .selectedday div{border:1px solid #004198;background-color:#8EBFFF!important;border-radius:2px}.mydp .selectmenu{height:24px;width:60px}.mydp .headerbtncell{background-color:#FAFAFA}.mydp .headerbtn,.mydp .headerlabelbtn{background:#FAFAFA;border:none;height:18px}.mydp .headerbtn{width:16px}.mydp .headerlabelbtn{font-size:14px}.mydp,.mydp .headertodaybtn,.mydp .monthinput,.mydp .yearinput{border:1px solid #CCC}.mydp .btnclear,.mydp .btnpicker,.mydp .headerbtn,.mydp .headermonthtxt,.mydp .headertodaybtn,.mydp .headeryeartxt,.mydp .selection{color:#000}.mydp .headertodaybtn{padding:0 4px;border-radius:2px;font-size:11px;height:22px;min-width:60px;max-width:70px}.mydp button::-moz-focus-inner{border:0}.mydp .headermonthtxt,.mydp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.mydp .btnclear:focus,.mydp .btnpicker:focus,.mydp .headertodaybtn:focus{background:#ADD8E6}.mydp .headerbtn:focus,.mydp .monthlabel:focus,.mydp .yearlabel:focus{color:#ADD8E6;outline:0}.mydp .daycell:focus{outline:#CCC solid 1px}.mydp .icon-calendar,.mydp .icon-cross{font-size:16px}.mydp .icon-left,.mydp .icon-right{color:#222;font-size:98%;vertical-align:middle}.mydp table{display:table;border-spacing:0}.mydp table td{padding:0}.mydp table,.mydp td,.mydp th{border:none}.mydp .btnclearenabled:hover,.mydp .btnpickerenabled:hover,.mydp .headertodaybtnenabled:hover,.mydp .tablesingleday:hover{background-color:#8BDAF4}.mydp .headerbtn,.mydp .monthlabel,.mydp .yearlabel{cursor:pointer}.mydp .monthinput,.mydp .yearinput{width:40px;height:22px;text-align:center;font-weight:700;outline:0;border-radius:2px}.mydp .headerbtn:hover,.mydp .monthlabel:hover,.mydp .yearlabel:hover{color:#8BDAF4}@font-face{font-family:mydatepicker;src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SAssAAAC8AAAAYGNtYXDMUczTAAABHAAAAGxnYXNwAAAAEAAAAYgAAAAIZ2x5ZmFQ1q4AAAGQAAABbGhlYWQGZuTFAAAC/AAAADZoaGVhB4IDyQAAAzQAAAAkaG10eBYAAnAAAANYAAAAIGxvY2EBdAE0AAADeAAAABJtYXhwABUAPgAAA4wAAAAgbmFtZQ5R9RkAAAOsAAABnnBvc3QAAwAAAAAFTAAAACAAAwOaAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmBwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAUAAAABAAEAADAAAAAQAg5gDmAuYF5gf//f//AAAAAAAg5gDmAuYF5gf//f//AAH/4xoEGgMaARoAAAMAAQAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAMAEAAAAPAA4AABAAJAA4AEwAYAB0AIgAnACwAMQA2ADsAABMRMxEjFyE1IRUDITUhFQERMxEjJRUzNSMTFTM1IzMVMzUjMxUzNSMBFTM1IzMVMzUjMxUzNSMTFTM1I0Bzc0ADAP0AQAOA/IADDXNz/ZOAgCCAgMCAgMCAgP6AgIDAgIDAgIAggIADAP1AAsBzc3P9c3NzAwD9QALAgMDA/sCAgICAgID/AICAgICAgAJAwMAAAAAAAgBwADADkANQAAQACQAANwEnARcDATcBB+kCp3n9WXl5Aqd5/Vl5MAKnef1ZeQKn/Vl5Aqd5AAABAOAAAAMgA4AAAwAAAQMBJQMgA/3DASADgPyAAcPfAAEA4AAAAyADgAADAAA3EwEF4AMCPf7gAAOA/j3fAAAAAQAAAAEAAF0/BsNfDzz1AAsEAAAAAADRxFAkAAAAANHEUCQAAAAAA8ADgAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADwAABAAAAAAAAAAAAAAAAAAAACAQAAAAAAAAAAAAAAAIAAAAEAABABAAAcAQAAOAEAADgAAAAAAAKABQAHgB6AJYApgC2AAAAAQAAAAgAPAAMAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAkAAAABAAAAAAACAAcAcgABAAAAAAADAAkAPAABAAAAAAAEAAkAhwABAAAAAAAFAAsAGwABAAAAAAAGAAkAVwABAAAAAAAKABoAogADAAEECQABABIACQADAAEECQACAA4AeQADAAEECQADABIARQADAAEECQAEABIAkAADAAEECQAFABYAJgADAAEECQAGABIAYAADAAEECQAKADQAvHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclJlZ3VsYXIAUgBlAGcAdQBsAGEAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAckZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('truetype');font-weight:400;font-style:normal}.mydp .icon{font-family:mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mydp .icon-calendar:before{content:"\\e600"}.mydp .icon-cross:before{content:"\\e602"}.mydp .icon-left:before{content:"\\e605"}.mydp .icon-right:before{content:"\\e607"}`],
    template: `<div class="mydp" [ngStyle]="{'width': opts.width, 'border': opts.inline ? 'none' : null}"><div class="selectiongroup" *ngIf="!opts.inline"><input type="text" class="selection" aria-label="Calendar input field" [attr.maxlength]="opts.dateFormat.length" [ngClass]="{'invaliddate': invalidDate&&opts.indicateInvalidDate}" placeholder="{{opts.showDateFormatPlaceholder?opts.dateFormat:opts.customPlaceholderTxt}}" [ngStyle]="{'height': opts.height, 'line-height': opts.height, 'font-size': opts.selectionTxtFontSize, 'border': 'none', 'padding-right': selectionDayTxt.length>0&&opts.showClearDateBtn ? '60px' : '30px'}" (keyup)="userDateInput($event)" [value]="selectionDayTxt" (blur)="lostFocusInput($event)" [disabled]="opts.componentDisabled" [readonly]="!opts.editableDateField" [required]="opts.inputValueRequired"> <span class="selbtngroup" [style.height]="opts.height"><button type="button" aria-label="Clear Date" class="btnclear" *ngIf="selectionDayTxt.length>0&&opts.showClearDateBtn" (click)="removeBtnClicked()" [ngClass]="{'btnclearenabled': !opts.componentDisabled, 'btncleardisabled': opts.componentDisabled}" [disabled]="opts.componentDisabled"><span class="icon icon-cross" [ngStyle]="{'line-height': opts.height}"></span></button> <button type="button" aria-label="Open Calendar" class="btnpicker" (click)="openBtnClicked()" [ngClass]="{'btnpickerenabled': !opts.componentDisabled, 'btnpickerdisabled': opts.componentDisabled}" [disabled]="opts.componentDisabled"><span class="icon icon-calendar" [ngStyle]="{'line-height': opts.height}"></span></button></span></div><div class="selector" *ngIf="showSelector||opts.inline" [ngClass]="{'inlinedp': opts.inline, 'alignselectorright': opts.alignSelectorRight, 'selectorarrow': opts.showSelectorArrow&&!opts.inline, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight&&!opts.inline, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight&&!opts.inline}"><table class="header"><tr><td><div style="float:left"><div class="headerbtncell"><button type="button" aria-label="Previous Month" class="headerbtn icon icon-left" (click)="prevMonth()"></button></div><div class="headermonthtxt"><input type="text" *ngIf="editMonth" class="monthinput" maxlength="10" inputFocus [value]="visibleMonth.monthTxt" (keyup)="userMonthInput($event)" (click)="$event.stopPropagation()" [ngClass]="{'invalidmonth': invalidMonth}"> <button class="headerlabelbtn" type="button" [ngClass]="{'monthlabel': opts.editableMonthAndYear}" *ngIf="!editMonth" (click)="opts.editableMonthAndYear&&editMonthClicked($event)" tabindex="{{opts.editableMonthAndYear?'0':'-1'}}">{{visibleMonth.monthTxt}}</button></div><div class="headerbtncell"><button type="button" aria-label="Next Month" class="headerbtn icon icon-right" (click)="nextMonth()"></button></div></div></td><td *ngIf="opts.showTodayBtn"><button type="button" class="headertodaybtn" (click)="todayClicked()" [disabled]="disableTodayBtn" [ngClass]="{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}">{{opts.todayBtnTxt}}</button></td><td><div style="float:right"><div class="headerbtncell"><button type="button" aria-label="Previous Year" class="headerbtn icon icon-left" (click)="prevYear()"></button></div><div class="headeryeartxt"><input type="text" *ngIf="editYear" class="yearinput" maxlength="4" inputFocus [value]="visibleMonth.year" (keyup)="userYearInput($event)" (click)="$event.stopPropagation()" [ngClass]="{'invalidyear': invalidYear}"> <button class="headerlabelbtn" type="button" [ngClass]="{'yearlabel': opts.editableMonthAndYear}" *ngIf="!editYear" (click)="opts.editableMonthAndYear&&editYearClicked($event)" tabindex="{{opts.editableMonthAndYear?'0':'-1'}}">{{visibleMonth.year}}</button></div><div class="headerbtncell"><button type="button" aria-label="Next Year" class="headerbtn icon icon-right" (click)="nextYear()"></button></div></div></td></tr></table><table class="caltable"><thead><tr><th class="weekdaytitle" scope="col" *ngFor="let d of weekDays">{{d}}</th></tr></thead><tbody><tr *ngFor="let w of dates"><td class="daycell" *ngFor="let d of w" [ngClass]="{'currmonth':d.cmo===CURR_MONTH&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===CURR_MONTH, 'disabled': d.disabled, 'tablesingleday': d.cmo===CURR_MONTH&&!d.disabled}" (click)="!d.disabled&&cellClicked(d);$event.stopPropagation()" (keydown)="cellKeyDown($event, d)" tabindex="0"><div [ngClass]="{'prevmonth':d.cmo===PREV_MONTH,'currmonth':d.cmo===CURR_MONTH,'nextmonth':d.cmo===NEXT_MONTH,'sunday':d.dayNbr === 0 && opts.sunHighlight}"><span [ngClass]="{'currday':d.currDay&&opts.markCurrentDay, 'sundayDim': opts.sunHighlight && d.dayNbr === 0 && (d.cmo===PREV_MONTH || d.cmo===NEXT_MONTH || d.disabled)}">{{d.dateObj.day}}</span></div></td></tr></tbody></table></div></div>`,
    providers: [LocaleService, ValidatorService],
    encapsulation: ViewEncapsulation.None
})

export class MyDatePicker implements OnChanges {
    @Input() options: any;
    @Input() locale: string;
    @Input() defaultMonth: string;
    @Input() selDate: string;
    @Output() dateChanged: EventEmitter<Object> = new EventEmitter();
    @Output() inputFieldChanged: EventEmitter<Object> = new EventEmitter();
    @Output() calendarViewChanged: EventEmitter<Object> = new EventEmitter();

    showSelector: boolean = false;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedDate: IMyDate = {year: 0, month: 0, day: 0};
    weekDays: Array<string> = [];
    dates: Array<Object> = [];
    selectionDayTxt: string = "";
    invalidDate: boolean = false;
    disableTodayBtn: boolean = false;
    dayIdx: number = 0;
    weekDayOpts: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

    editMonth: boolean = false;
    invalidMonth: boolean = false;
    editYear: boolean = false;
    invalidYear: boolean = false;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    MIN_YEAR: number = 1000;
    MAX_YEAR: number = 9999;

    // Default options
    opts: IMyOptions = {
        dayLabels: <IMyDayLabels> {},
        monthLabels: <IMyMonthLabels> {},
        dateFormat: <string> "",
        showTodayBtn: <boolean> true,
        todayBtnTxt: <string> "",
        firstDayOfWeek: <string> "",
        sunHighlight: <boolean> true,
        markCurrentDay: <boolean> true,
        disableUntil: <IMyDate> {year: 0, month: 0, day: 0},
        disableSince: <IMyDate> {year: 0, month: 0, day: 0},
        disableDays: <Array<IMyDate>> [],
        disableDateRange: <IMyDateRange> {begin: <IMyDate> {year: 0, month: 0, day: 0}, end: <IMyDate> {year: 0, month: 0, day: 0}},
        disableWeekends: <boolean> false,
        height: <string> "34px",
        width: <string> "100%",
        selectionTxtFontSize: <string> "18px",
        inline: <boolean> false,
        showClearDateBtn: <boolean> true,
        alignSelectorRight: <boolean> false,
        indicateInvalidDate: <boolean> true,
        showDateFormatPlaceholder: <boolean> false,
        customPlaceholderTxt: <string> "",
        editableDateField: <boolean> true,
        editableMonthAndYear: <boolean> true,
        minYear: <number> this.MIN_YEAR,
        maxYear: <number> this.MAX_YEAR,
        componentDisabled: <boolean> false,
        inputValueRequired: <boolean> false,
        showSelectorArrow: <boolean> true
    };

    constructor(public elem: ElementRef, private renderer: Renderer, private localeService: LocaleService, private validatorService: ValidatorService) {
        this.setLocaleOptions();
        renderer.listenGlobal("document", "click", (event: any) => {
            if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = false;
            }
            if (this.opts.editableMonthAndYear && event.target && this.elem.nativeElement.contains(event.target)) {
                this.resetMonthYearEdit();
            }
        });
    }

    setLocaleOptions(): void {
        let opts: IMyOptions = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((k) => {
            (<IMyOptions>this.opts)[k] = opts[k];
        });
    }

    setOptions(): void {
        if (this.options !== undefined) {
            Object.keys(this.options).forEach((k) => {
                (<IMyOptions>this.opts)[k] = this.options[k];
            });
        }
        if (this.opts.minYear < this.MIN_YEAR) {
            this.opts.minYear = this.MIN_YEAR;
        }
        if (this.opts.maxYear > this.MAX_YEAR) {
            this.opts.maxYear = this.MAX_YEAR;
        }
    }

    resetMonthYearEdit(): void {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    }

    editMonthClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editMonth = true;
        }
    }

    editYearClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editYear = true;
        }
    }

    userDateInput(event: any): void {
        this.invalidDate = false;
        if (event.target.value.length === 0) {
            this.clearDate();
        }
        else {
            let date: IMyDate = this.validatorService.isDateValid(event.target.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRange, this.opts.monthLabels);
            if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
                this.selectDate({day: date.day, month: date.month, year: date.year});
            }
            else {
                this.invalidDate = true;
            }
        }
        if (this.invalidDate) {
            this.inputFieldChanged.emit({value: event.target.value, dateFormat: this.opts.dateFormat, valid: !(event.target.value.length === 0 || this.invalidDate)});
        }
    }

    lostFocusInput(event: any): void {
        this.selectionDayTxt = event.target.value;
    }

    userMonthInput(event: any): void {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidMonth = false;

        let m: number = this.validatorService.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            if (m !== this.visibleMonth.monthNbr) {
                this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year};
                this.generateCalendar(m, this.visibleMonth.year);
            }
        }
        else {
            this.invalidMonth = true;
        }
    }

    userYearInput(event: any): void {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidYear = false;

        let y: number = this.validatorService.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            if (y !== this.visibleMonth.year) {
                this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y};
                this.generateCalendar(this.visibleMonth.monthNbr, y);
            }
        }
        else {
            this.invalidYear = true;
        }
    }

    isTodayDisabled(): void {
        this.disableTodayBtn = this.validatorService.isDisabledDay(this.getToday(), this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRange);
    }

    parseOptions(): void {
        this.setOptions();
        if (this.locale) {
            this.setLocaleOptions();
        }
        this.isTodayDisabled();
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty("locale")) {
            this.locale = changes["locale"].currentValue;
        }

        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
        }

        this.weekDays.length = 0;
        this.parseOptions();

        if (changes.hasOwnProperty("defaultMonth")) {
            let dm: string = changes["defaultMonth"].currentValue;
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = {monthTxt: "", monthNbr: 0, year: 0};
            }
        }

        if (changes.hasOwnProperty("selDate")) {
            let sd: any = changes["selDate"];
            if (sd.currentValue !== null && sd.currentValue !== undefined && sd.currentValue !== "" && Object.keys(sd.currentValue).length !== 0) {
                this.selectedDate = this.parseSelectedDate(sd.currentValue);
            }
            else {
                // Do not clear on init
                if (!sd.isFirstChange()) {
                    this.clearDate();
                }
            }
        }
        if (this.opts.inline) {
            this.setVisibleMonth();
        }
    }

    removeBtnClicked(): void {
        // Remove date button clicked
        this.clearDate();
    }

    openBtnClicked(): void {
        // Open selector button clicked
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            this.setVisibleMonth();
        }
    }

    setVisibleMonth(): void {
        // Sets visible month of calendar
        let y: number = 0, m: number = 0;
        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today: IMyDate = this.getToday();
                y = today.year;
                m = today.month;
            } else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};

        // Create current month
        this.generateCalendar(m, y);
    }

    clearDate(): void {
        // Clears the date and notifies parent using callbacks
        this.selectionDayTxt = "";
        this.selectedDate = {year: 0, month: 0, day: 0};
        this.dateChanged.emit({date: {}, jsdate: null, formatted: this.selectionDayTxt, epoc: 0});
        this.inputFieldChanged.emit({value: "", dateFormat: this.opts.dateFormat, valid: false});
        this.invalidDate = false;
    }

    prevMonth(): void {
        // Previous month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    nextMonth(): void {
        // Next month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    prevYear(): void {
        // Previous year from calendar
        if (this.visibleMonth.year - 1 < this.opts.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear(): void {
        // Next year from calendar
        if (this.visibleMonth.year + 1 > this.opts.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    todayClicked(): void {
        // Today button clicked
        let today: IMyDate = this.getToday();
        this.selectDate({day: today.day, month: today.month, year: today.year});
        if (this.opts.inline && today.year !== this.visibleMonth.year || today.month !== this.visibleMonth.monthNbr) {
            this.visibleMonth = {monthTxt: this.opts.monthLabels[today.month], monthNbr: today.month, year: today.year};
            this.generateCalendar(today.month, today.year);
        }
    }

    cellClicked(cell: any): void {
        // Cell clicked on the calendar
        if (cell.cmo === this.PREV_MONTH) {
            // Previous month of day
            this.prevMonth();
        }
        else if (cell.cmo === this.CURR_MONTH) {
            // Current month of day
            this.selectDate(cell.dateObj);
        }
        else if (cell.cmo === this.NEXT_MONTH) {
            // Next month of day
            this.nextMonth();
        }
        this.resetMonthYearEdit();
    }

    cellKeyDown(event: any, cell: any) {
        if ((event.keyCode === 13 || event.keyCode === 32) && !cell.disabled) {
            event.preventDefault();
            this.cellClicked(cell);
        }
    }

    selectDate(date: any): void {
        // Date selected, notifies parent using callbacks
        this.selectedDate = {day: date.day, month: date.month, year: date.year};
        this.selectionDayTxt = this.formatDate(this.selectedDate);
        this.showSelector = false;
        this.dateChanged.emit({date: this.selectedDate, jsdate: this.getDate(date.year, date.month, date.day), formatted: this.selectionDayTxt, epoc: Math.round(this.getTimeInMilliseconds(this.selectedDate) / 1000.0)});
        this.inputFieldChanged.emit({value: this.selectionDayTxt, dateFormat: this.opts.dateFormat, valid: true});
        this.invalidDate = false;
    }

    preZero(val: string): string {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? "0" + val : val;
    }

    formatDate(val: any): string {
        // Returns formatted date string, if mmm is part of dateFormat returns month as a string
        // let formatted: string = this.opts.dateFormat.replace("yyyy", val.year).replace("dd", this.preZero(val.day));
        let formatted: string = this.getFormated(val);
        return this.opts.dateFormat.indexOf("mmm") !== -1 ? formatted.replace("mmm", this.monthText(val.month)) : formatted.replace("mm", this.preZero(val.month));
    }

    getFormated(val: any): string {
        if (this.opts.dateFormat.indexOf("yyyy") !== -1) {
            return this.opts.dateFormat.replace("yyyy", val.year).replace("dd", this.preZero(val.day));
        } else {
            let year = val.year.toString();

            if (year.length >= 4) {
                year = year.substr(2,2);
            }

            return this.opts.dateFormat.replace("yy", year).replace("dd", this.preZero(val.day))
        }
    }

    monthText(m: number): string {
        // Returns month as a text
        return this.opts.monthLabels[m];
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.CURR_MONTH;
    }

    getToday(): IMyDate {
        let date: Date = new Date();
        return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    }

    getTimeInMilliseconds(date: IMyDate): number {
        return this.getDate(date.year, date.month, date.day).getTime();
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: su=0, mo=1, tu=2, we=3 ...
        let d: Date = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    }

    getWeekday(date: IMyDate): string {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    }

    getDate(year: number, month: number, day: number): Date {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number): void {
        this.dates.length = 0;
        let today: IMyDate = this.getToday();
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.PREV_MONTH;
        for (let i = 1; i < 7; i++) {
            let week: IMyWeek[] = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: y, month: m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.validatorService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRange)});
                }

                cmo = this.CURR_MONTH;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.validatorService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRange)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                    }
                    let date: IMyDate = {year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.validatorService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableDays, this.opts.disableDateRange)});
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
        // Notify parent
        this.calendarViewChanged.emit({year: y, month: m, first: {number: 1, weekday: this.getWeekday({year: y, month: m, day: 1})}, last: {number: dInThisM, weekday: this.getWeekday({year: y, month: m, day: dInThisM})}});
    }

    parseSelectedDate(selDate: any): IMyDate {
        // Parse selDate value - it can be string or IMyDate object
        let date: IMyDate = {day: 0, month: 0, year: 0};
        if (typeof selDate === "string") {
            let sd: string = <string>selDate;
            date.day = this.validatorService.parseDatePartNumber(this.opts.dateFormat, sd, "dd");

            date.month = this.opts.dateFormat.indexOf("mmm") !== -1
                ? this.validatorService.parseDatePartMonthName(this.opts.dateFormat, sd, "mmm", this.opts.monthLabels)
                : this.validatorService.parseDatePartNumber(this.opts.dateFormat, sd, "mm");

            date.year = this.validatorService.parseDatePartNumber(this.opts.dateFormat, sd, "yyyy");
        }
        else if (typeof selDate === "object") {
            date = selDate;
        }
        this.selectionDayTxt = this.formatDate(date);
        return date;
    }

    parseSelectedMonth(ms: string): IMyMonth {
        return this.validatorService.parseDefaultMonth(ms);
    }
}
