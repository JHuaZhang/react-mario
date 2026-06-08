import React, { useMemo } from 'react';
import { Tag, Typography } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { useWizardStore } from '@/store/templateStore';

const { Text } = Typography;

/** 将数据组装为完整的模板 JSON，方便整体对比 */
function buildTemplateJson(name: string, schema: unknown[]): string {
  return JSON.stringify({ name, schema }, null, 2);
}

/** 第四步「提交」：展示确认信息与 JSON Diff 对比 */
const SubmitStep: React.FC = observer(() => {
  const { basicInfoValues, isEditMode, componentStore, originalSnapshot } = useWizardStore();
  const currentSchema = componentStore.components;

  const { oldJson, newJson, hasChanges } = useMemo(() => {
    const currentJson = buildTemplateJson(basicInfoValues.name, currentSchema);
    if (!isEditMode || !originalSnapshot) {
      return { oldJson: '', newJson: currentJson, hasChanges: true };
    }
    const originalJson = buildTemplateJson(originalSnapshot.basicInfo.name, originalSnapshot.schema);
    return {
      oldJson: originalJson,
      newJson: currentJson,
      hasChanges: originalJson !== currentJson,
    };
  }, [isEditMode, originalSnapshot, basicInfoValues.name, currentSchema]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* JSON Diff 对比 */}
      {isEditMode && originalSnapshot ? (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ padding: '8px 12px', background: '#fafafa', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
            <SwapOutlined style={{ marginRight: 8 }} />
            <Text strong>变更对比</Text>
            {hasChanges
              ? <Tag color="orange" style={{ marginLeft: 8 }}>有变更</Tag>
              : <Tag color="green" style={{ marginLeft: 8 }}>无变更</Tag>
            }
          </div>
          <ReactDiffViewer
            oldValue={oldJson}
            newValue={newJson}
            splitView
            compareMethod={DiffMethod.WORDS}
            leftTitle="原始数据"
            rightTitle="当前数据"
            styles={{
              contentText: { fontSize: '12px', lineHeight: '1.6' },
            }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <ReactDiffViewer
            oldValue=""
            newValue={newJson}
            splitView={false}
            compareMethod={DiffMethod.LINES}
            rightTitle="新增数据"
            styles={{
              contentText: { fontSize: '12px', lineHeight: '1.6' },
            }}
          />
        </div>
      )}
    </div>
  );
});

export default SubmitStep;
