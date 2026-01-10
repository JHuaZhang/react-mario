import { useEffect } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { ComponentConfig } from 'react-mario-core';
import { Form, FormItem, modelUtils } from 'react-antd-xform';
import { useStore } from '@/store/configStore';
import { useStore as useComponentStore } from '@/store/componentStore';

interface Props {
  currentComponent: ComponentConfig;
}

const SetConfig = observer((props: Props) => {
  const { currentComponent } = props;
  const { model } = useStore();
  const { updateComponent, setOpenPropertyPanel, setIsFirstSetting } = useComponentStore();

  useEffect(() => {
    model.values = {
      ...currentComponent,
    };
  }, [currentComponent]);

  const onSubmit = (values: any) => {
    updateComponent(currentComponent.id, values);
    setOpenPropertyPanel(false);
    modelUtils.reset(model);
    setIsFirstSetting(false);
  };

  return (
    <Form model={model} layout={{ labelWidth: '60px' }} onSubmit={onSubmit}>
      <FormItem required label="label" component="input" name="label" />
      <FormItem required label="name" component="input" name="name" />
      <Form.ItemView style={{ position: 'fixed', bottom: 10 }}>
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
