import { BaseComponent } from '@/types/enum';
import {
  InputSource,
  TextAreaSource,
  SelectSource,
  RadioSource,
  CheckboxSource,
  SliderSource,
  RateSource,
  MultiSelectSource,
  DatePickerSource,
  DateRangePickerSource,
  InputNumberSource,
  SwitchSource,
  TimePickerSource,
  TimeRangePickerSource,
  ColorPickerSource,
} from '@/icons/componentIcon';

const IconConfig = {
  [BaseComponent.Input]: InputSource,
  [BaseComponent.TextArea]: TextAreaSource,
  [BaseComponent.Select]: SelectSource,
  [BaseComponent.Radio]: RadioSource,
  [BaseComponent.Checkbox]: CheckboxSource,
  [BaseComponent.Slider]: SliderSource,
  [BaseComponent.Rate]: RateSource,
  [BaseComponent.MultiSelect]: MultiSelectSource,
  [BaseComponent.DatePicker]: DatePickerSource,
  [BaseComponent.DateRangePicker]: DateRangePickerSource,
  [BaseComponent.InputNumber]: InputNumberSource,
  [BaseComponent.Switch]: SwitchSource,
  [BaseComponent.TimePicker]: TimePickerSource,
  [BaseComponent.TimeRangePicker]: TimeRangePickerSource,
  [BaseComponent.ColorPicker]: ColorPickerSource,
} as const;

type IconKey = keyof typeof IconConfig;

export const getIcon = (componentName: string): JSX.Element => {
  if (componentName in IconConfig) {
    return IconConfig[componentName as IconKey];
  }
  return InputSource;
};
