export enum BaseComponent {
  Input = 'input',
  Select = 'select',
  MultiSelect = 'multiSelect',
  Radio = 'radio',
  Checkbox = 'checkbox',
  DatePicker = 'datePicker',
  DateRangePicker = 'dateRangePicker',
  TimePicker = 'timePicker',
  TimeRangePicker = 'timeRangePicker',
  TextArea = 'textArea',
  InputNumber = 'inputNumber',
  Slider = 'slider',
  Switch = 'switch',
  Rate = 'rate',
  ColorPicker = 'colorPicker',
}

export namespace BaseComponent {
  export function getAll(): string[] {
    return Object.values(BaseComponent).filter((value) => typeof value === 'string') as string[];
  }
}
