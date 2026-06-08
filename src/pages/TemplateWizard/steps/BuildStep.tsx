import React from 'react';
import Designer from '@/pages/Designer';
import { useWizardStore } from '@/store/templateStore';

/** 第二步「玩法搭建」：内嵌复用 Designer 画布，共享向导持有的 componentStore */
const BuildStep: React.FC = () => {
  const { componentStore } = useWizardStore();

  return (
    <div style={{ height: '100%', border: '1px solid #f0f0f0' }}>
      <Designer store={componentStore} />
    </div>
  );
};

export default BuildStep;
