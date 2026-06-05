import { FormItemConfig } from 'react-mario-core';

export const baseConfig: FormItemConfig[] = [
  { name: 'name', label: '字段标识', component: 'input', required: true },
  { name: 'label', label: '字段名称', component: 'input', required: true },
];

export const placeholderConfig: FormItemConfig = {
  name: 'defaultProps.placeholder',
  label: '占位提示',
  component: 'input',
};

export const allowClearConfig: FormItemConfig = {
  name: 'defaultProps.allowClear',
  label: '允许清空',
  component: 'switch',
};

export const disabledConfig: FormItemConfig = {
  name: 'defaultProps.disabled',
  label: '禁用状态',
  component: 'switch',
};

export const defaultValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'input',
};

export const defaultNumberValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'inputNumber',
};

export const defaultSwitchValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'switch',
};

export const defaultComplexValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'textArea',
  help: '多选请填JSON数组，如 ["1", "2"]',
  componentProps: {
    rows: 2,
  },
};

export const defaultDatePickerValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'datePicker',
};

export const defaultDateRangePickerValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'dateRangePicker',
};

export const defaultTimePickerValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'timePicker',
};

export const defaultTimeRangePickerValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'timeRangePicker',
};

export const defaultColorPickerValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'colorPicker',
};

export const defaultSliderValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'slider',
};

export const defaultRateValueConfig: FormItemConfig = {
  name: 'defaultProps.defaultValue',
  label: '默认值',
  component: 'rate',
};


export const optionsConfig: FormItemConfig = {
  name: 'defaultProps.options',
  label: '选项配置',
  // 使用 json 格式配置，或者多行文本
  component: 'textArea',
  help: '请填入合法的JSON数组，例如: [{"label": "选项1", "value": "1"}]',
  componentProps: {
    rows: 4,
  },
};

export const showSearchConfig: FormItemConfig = {
  name: 'defaultProps.showSearch',
  label: '支持搜索',
  component: 'switch',
};

export const searchPlaceholderConfig: FormItemConfig = {
  name: 'defaultProps.searchPlaceholder',
  label: '搜索提示文字',
  component: 'input',
  visible: (values: any) => values['defaultProps.showSearch'] === true,
};

export const componentConfigMap: Record<string, FormItemConfig[]> = {
  input: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
  ],
  select: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
    optionsConfig,
    showSearchConfig,
    searchPlaceholderConfig,
  ],
  multiSelect: [
    ...baseConfig,
    defaultComplexValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
    optionsConfig,
  ],
  radio: [
    ...baseConfig,
    defaultValueConfig,
    disabledConfig,
    optionsConfig,
  ],
  checkbox: [
    ...baseConfig,
    defaultComplexValueConfig,
    disabledConfig,
    optionsConfig,
  ],
  datePicker: [
    ...baseConfig,
    defaultDatePickerValueConfig,
    placeholderConfig,
    disabledConfig,
  ],
  dateRangePicker: [
    ...baseConfig,
    defaultDateRangePickerValueConfig,
    disabledConfig,
  ],
  timePicker: [
    ...baseConfig,
    defaultTimePickerValueConfig,
    placeholderConfig,
    disabledConfig,
  ],
  timeRangePicker: [
    ...baseConfig,
    defaultTimeRangePickerValueConfig,
    disabledConfig,
  ],
  textArea: [
    ...baseConfig,
    defaultValueConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
  ],
  inputNumber: [
    ...baseConfig,
    defaultNumberValueConfig,
    placeholderConfig,
    disabledConfig,
  ],
  slider: [
    ...baseConfig,
    defaultSliderValueConfig,
    disabledConfig,
  ],
  switch: [
    ...baseConfig,
    defaultSwitchValueConfig,
    disabledConfig,
  ],
  rate: [
    ...baseConfig,
    defaultRateValueConfig,
    disabledConfig,
  ],
  colorPicker: [
    ...baseConfig,
    defaultColorPickerValueConfig,
    disabledConfig,
  ],
};
