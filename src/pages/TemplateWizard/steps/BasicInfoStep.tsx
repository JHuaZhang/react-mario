import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, FormItem } from 'react-antd-xform';
import { useWizardStore } from '@/store/templateStore';

/**
 * 第一步「基本信息」：使用 react-antd-xform 驱动表单。
 * FormModel 由 WizardStore.basicInfoModel 统一管理，
 * 编辑模式下异步回填数据会自动反映到表单上。
 */
const BasicInfoStep: React.FC = observer(() => {
  const { basicInfoModel } = useWizardStore();

  return (
    <div style={{ maxWidth: 480, margin: '40px auto' }}>
      <Form model={basicInfoModel}>
        <FormItem
          component="input"
          label="模板名称"
          name="name"
          required
          componentProps={{ placeholder: '请输入模板名称', maxLength: 50 }}
        />
      </Form>
    </div>
  );
});

export default BasicInfoStep;
