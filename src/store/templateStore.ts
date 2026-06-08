import React from 'react';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { FormModel } from 'react-antd-xform';
import type { ComponentStore } from './componentStore';

import { WizardStep } from '@/types/enum';

export const WIZARD_STEP_ITEMS = [
  { key: WizardStep.BASIC_INFO, title: '基本信息' },
  { key: WizardStep.BUILD, title: '玩法搭建' },
  { key: WizardStep.ACTIVITY_CONFIG, title: '活动配置' },
  { key: WizardStep.SUBMIT, title: '提交' },
] as const;

/* ========== 基本信息 FormModel ========== */

export interface BasicInfoValues {
  name: string;
}

const DEFAULT_BASIC_INFO: BasicInfoValues = { name: '' };

/* ========== 向导状态 Store ========== */

/**
 * 向导级别状态：管理步骤、编辑模式、表单数据。
 * - basicInfoModel: 基本信息表单（react-antd-xform FormModel）
 * - componentStore: 画布搭建组件（外部传入，由向导持有）
 */
export class TemplateWizardStore {
  /** 当前步骤索引（0 基本信息 / 1 玩法搭建 / 2 活动配置 / 3 提交） */
  currentStep = 0;
  /** 编辑模式下的模板 id，新增模式为 null */
  editId: string | null = null;
  /** 提交中状态 */
  submitting = false;
  /** 数据加载中 */
  loading = false;

  /** 第一步 - 基本信息表单模型 */
  basicInfoModel: FormModel<BasicInfoValues>;
  /** 画布组件 store（由外部注入） */
  componentStore: ComponentStore;

  /** 编辑模式下的原始数据快照（用于提交时对比变更） */
  originalSnapshot: {
    basicInfo: BasicInfoValues;
    schema: unknown[];
  } | null = null;

  constructor(componentStore: ComponentStore) {
    this.basicInfoModel = new FormModel<BasicInfoValues>({ ...DEFAULT_BASIC_INFO });
    this.componentStore = componentStore;
    makeAutoObservable(this, {
      basicInfoModel: observable.ref,
      componentStore: false,
      originalSnapshot: observable.ref,
    });
  }

  /* ---------- 步骤控制 ---------- */

  setCurrentStep = (step: number) => {
    this.currentStep = step;
  };

  nextStep = () => {
    this.currentStep += 1;
  };

  prevStep = () => {
    if (this.currentStep > 0) this.currentStep -= 1;
  };

  /* ---------- 编辑模式 ---------- */

  setEditId = (id: string | null) => {
    this.editId = id;
  };

  get isEditMode(): boolean {
    return this.editId !== null;
  }

  /* ---------- 基本信息 ---------- */

  /** 获取基本信息当前值 */
  get basicInfoValues(): BasicInfoValues {
    return this.basicInfoModel.values as BasicInfoValues;
  }

  /** 回填基本信息（编辑模式从接口拉取后调用） */
  fillBasicInfo = (info: Partial<BasicInfoValues>) => {
    const currentValues = this.basicInfoModel.values as BasicInfoValues;
    this.basicInfoModel = new FormModel<BasicInfoValues>({
      ...currentValues,
      ...info,
    });
  };

  /** 保存原始数据快照（编辑模式回填数据后调用） */
  saveOriginalSnapshot = (schema: unknown[]) => {
    this.originalSnapshot = {
      basicInfo: { ...(this.basicInfoModel.values as BasicInfoValues) },
      schema: JSON.parse(JSON.stringify(schema)),
    };
  };

  /* ---------- 提交 ---------- */

  setSubmitting = (submitting: boolean) => {
    this.submitting = submitting;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  /** 校验基本信息，返回错误消息或 null */
  validateBasicInfo = (): string | null => {
    const name = this.basicInfoValues.name?.trim();
    if (!name) return '请填写模板名称';
    return null;
  };

  /* ---------- 生命周期 ---------- */

  /** 重置向导所有状态 */
  reset = () => {
    runInAction(() => {
      this.currentStep = 0;
      this.editId = null;
      this.submitting = false;
      this.loading = false;
      this.basicInfoModel = new FormModel<BasicInfoValues>({ ...DEFAULT_BASIC_INFO });
      this.componentStore.clearComponents();
    });
  };
}

/* ========== Context ========== */

const WizardContext = React.createContext<TemplateWizardStore | null>(null);

export const WizardProvider = WizardContext.Provider;

export function useWizardStore(): TemplateWizardStore {
  const store = React.useContext(WizardContext);
  if (!store) {
    throw new Error('useWizardStore 必须在 WizardProvider 内使用');
  }
  return store;
}
