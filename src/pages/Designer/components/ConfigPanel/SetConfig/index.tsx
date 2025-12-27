import { memo } from 'react';
import { ComponentConfig } from 'react-mario-core';
import { Form } from 'react-antd-xform';

interface Props {
  currentComponent: ComponentConfig;
  currentComponentType: string | undefined;
}

const SetConfig = memo((props: Props) => {
  const { currentComponent, currentComponentType } = props;
  console.log(currentComponent, 'currentComponent');
  console.log(currentComponentType, 'currentComponentType');
  return <div>index</div>;
});

export default SetConfig;
