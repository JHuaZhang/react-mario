import { useEffect } from 'react';
import { Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { ComponentConfig, FormRenderer } from 'react-mario-core';
import { Form, modelUtils } from 'react-antd-xform';
import { useStore } from '@/store/configStore';
import { useStore as useComponentStore } from '@/store/componentStore';
import { componentConfigMap, baseConfig } from '../config/componentConfigs';

interface Props {
  currentComponent: ComponentConfig;
}

const SetConfig = observer((props: Props) => {
  const { currentComponent } = props;
  const { model } = useStore();
  const { updateComponent, setOpenPropertyPanel, setIsFirstSetting } = useComponentStore();

  useEffect(() => {
    // Set form model values, stringifying objects if needed (like options)
    const initialValues: any = {
      ...currentComponent,
    };
    
    if (currentComponent.defaultProps?.options) {
      initialValues['defaultProps.options'] = JSON.stringify(currentComponent.defaultProps.options, null, 2);
    }

    model.values = initialValues;
  }, [currentComponent]);

  const onSubmit = (values: any) => {
    try {
      // Parse any JSON strings if present (like options)
      if (values['defaultProps.options']) {
        values['defaultProps.options'] = JSON.parse(values['defaultProps.options']);
      }
      
      // Expand flat keys like "defaultProps.placeholder" into nested objects
      const formattedValues = { ...values };
      const defaultProps: Record<string, any> = {};
      
      Object.keys(formattedValues).forEach((key) => {
        if (key.startsWith('defaultProps.')) {
          const propKey = key.split('.')[1];
          defaultProps[propKey] = formattedValues[key];
          delete formattedValues[key];
        }
      });
      
      if (Object.keys(defaultProps).length > 0) {
        formattedValues.defaultProps = {
          ...(currentComponent.defaultProps || {}),
          ...defaultProps
        };
      }

      updateComponent(currentComponent.id as string, formattedValues);
      setOpenPropertyPanel(false);
      modelUtils.reset(model);
      setIsFirstSetting(false);
    } catch (e) {
      message.error('配置参数格式有误，请检查（如JSON格式是否正确）');
    }
  };
  
  const componentType = currentComponent.component || 'input';
  const configSchema = componentConfigMap[componentType] || baseConfig;

  return (
    <Form model={model} layout={{ labelWidth: '80px' }} onSubmit={onSubmit}>
      <FormRenderer config={configSchema} showButtons={false} model={model} />
      
      <Form.ItemView style={{ position: 'sticky', bottom: 10, marginTop: 20, textAlign: 'center' }}>
        <Form.Submit ButtonComponent={Button} type="primary">
          提交
        </Form.Submit>
        <Form.Reset ButtonComponent={Button} style={{ marginLeft: 16 }} type="default">
          重置
        </Form.Reset>
      </Form.ItemView>
    </Form>
  );
});

export default SetConfig;
