import { ComponentConfig } from 'react-mario-core';
import { Form, FormItem } from 'react-antd-xform';
import { useStore } from '@/store/configStore';
import { observer } from 'mobx-react-lite';

interface Props {
  currentComponent: ComponentConfig;
  currentComponentType: string | undefined;
}

const SetConfig = observer((props: Props) => {
  const { currentComponent, currentComponentType } = props;
  const { model } = useStore();

  console.log(currentComponent, 'currentComponent');
  console.log(currentComponentType, 'currentComponentType');
  return (
    <Form model={model}>
      <FormItem required label="组件label" component="input" name="label" />
    </Form>
  );
});
export default SetConfig;
