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

export const componentConfigMap: Record<string, FormItemConfig[]> = {
  input: [
    ...baseConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
  ],
  select: [
    ...baseConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
    optionsConfig,
  ],
  multiSelect: [
    ...baseConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
    optionsConfig,
  ],
  radio: [
    ...baseConfig,
    disabledConfig,
    optionsConfig,
  ],
  checkbox: [
    ...baseConfig,
    disabledConfig,
    optionsConfig,
  ],
  datePicker: [
    ...baseConfig,
    placeholderConfig,
    disabledConfig,
  ],
  dateRangePicker: [
    ...baseConfig,
    disabledConfig,
  ],
  timePicker: [
    ...baseConfig,
    placeholderConfig,
    disabledConfig,
  ],
  timeRangePicker: [
    ...baseConfig,
    disabledConfig,
  ],
  textArea: [
    ...baseConfig,
    placeholderConfig,
    allowClearConfig,
    disabledConfig,
  ],
  inputNumber: [
    ...baseConfig,
    placeholderConfig,
    disabledConfig,
  ],
  slider: [
    ...baseConfig,
    disabledConfig,
  ],
  switch: [
    ...baseConfig,
    disabledConfig,
  ],
  rate: [
    ...baseConfig,
    disabledConfig,
  ],
  colorPicker: [
    ...baseConfig,
    disabledConfig,
  ],
};
