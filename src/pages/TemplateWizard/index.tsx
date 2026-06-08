import React, { useEffect } from 'react';
import { Steps, Button, Space, message, Spin } from 'antd';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { ComponentStore } from '@/store/componentStore';
import { TemplateWizardStore, WizardProvider, WIZARD_STEP_ITEMS } from '@/store/templateStore';
import { WizardStep, TemplateStatus } from '@/types/enum';
import { templateApi } from '@/api/template';
import BasicInfoStep from './steps/BasicInfoStep';
import BuildStep from './steps/BuildStep';
import ActivityConfigStep from './steps/ActivityConfigStep';
import SubmitStep from './steps/SubmitStep';

const TemplateWizard: React.FC = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const componentStore = useLocalObservable(() => new ComponentStore());
  const wizardStore = useLocalObservable(() => new TemplateWizardStore(componentStore));

  // 编辑模式：按路由 id 拉详情回填
  useEffect(() => {
    wizardStore.reset();

    if (!id) return;

    wizardStore.setEditId(id);
    wizardStore.setLoading(true);
    templateApi
      .detail(id)
      .then((data) => {
        wizardStore.fillBasicInfo({ name: data.name });
        const schemaData = Array.isArray(data.schema) ? data.schema : [];
        componentStore.importComponents(schemaData);
        wizardStore.saveOriginalSnapshot(schemaData);
      })
      .catch(() => {
        // 错误提示已在 request 拦截器统一处理
      })
      .finally(() => wizardStore.setLoading(false));

    return () => wizardStore.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goList = () => navigate('/templates');

  const handleNext = () => {
    if (wizardStore.currentStep === WizardStep.BASIC_INFO) {
      const errorMessage = wizardStore.validateBasicInfo();
      if (errorMessage) {
        message.warning(errorMessage);
        return;
      }
    }
    wizardStore.nextStep();
  };

  const handlePrev = () => wizardStore.prevStep();

  const handleCancel = () => {
    wizardStore.reset();
    goList();
  };

  const handleSubmit = async () => {
    const errorMessage = wizardStore.validateBasicInfo();
    if (errorMessage) {
      message.warning(errorMessage);
      wizardStore.setCurrentStep(WizardStep.BASIC_INFO);
      return;
    }

    const payload = {
      name: wizardStore.basicInfoValues.name.trim(),
      schema: componentStore.components,
      status: TemplateStatus.SUBMITTED,
    };

    try {
      wizardStore.setSubmitting(true);
      if (wizardStore.editId) {
        await templateApi.update(wizardStore.editId, payload);
        message.success('更新成功');
      } else {
        await templateApi.create(payload);
        message.success('提交成功');
      }
      goList();
    } catch {
      // 错误提示已在 request 拦截器统一处理
    } finally {
      wizardStore.setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (wizardStore.currentStep) {
      case WizardStep.BASIC_INFO:
        return <BasicInfoStep />;
      case WizardStep.BUILD:
        return <BuildStep />;
      case WizardStep.ACTIVITY_CONFIG:
        return <ActivityConfigStep />;
      case WizardStep.SUBMIT:
        return <SubmitStep />;
      default:
        return null;
    }
  };

  const isLastStep = wizardStore.currentStep === WizardStep.SUBMIT;

  return (
    <WizardProvider value={wizardStore}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '0 24px', borderBottom: '1px solid #f0f0f0', background: '#fff', flexShrink: 0 }}>
          <Steps
            current={wizardStore.currentStep}
            items={WIZARD_STEP_ITEMS.map(({ title }) => ({ title }))}
            style={{ maxWidth: 720, margin: '16px auto' }}
          />
        </div>

        <div style={{
          flex: 1,
          minHeight: 0,
          overflow: wizardStore.currentStep === WizardStep.BUILD ? 'hidden' : 'auto',
          padding: wizardStore.currentStep === WizardStep.BUILD ? 0 : 16,
          background: '#f5f5f5',
          position: 'relative',
        }}>
          {wizardStore.loading && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.6)',
            }}>
              <Spin />
            </div>
          )}
          {renderStep()}
        </div>

        <div style={{
          flexShrink: 0,
          padding: '12px 24px',
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          textAlign: 'right',
        }}>
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            {wizardStore.currentStep > 0 && <Button onClick={handlePrev}>上一步</Button>}
            {!isLastStep && (
              <Button type="primary" onClick={handleNext}>
                下一步
              </Button>
            )}
            {isLastStep && (
              <Button type="primary" loading={wizardStore.submitting} onClick={handleSubmit}>
                提交
              </Button>
            )}
          </Space>
        </div>
      </div>
    </WizardProvider>
  );
});

export default TemplateWizard;
