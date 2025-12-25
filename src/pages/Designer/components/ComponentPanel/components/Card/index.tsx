import { useState, useRef } from 'react';
import { BorderOuterOutlined, CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import ComponentItem from '../ComponentItem';
import { ComponentItemConfig } from '@/types/components';
import styles from './index.module.css';

interface Props {
  componentList: ComponentItemConfig[];
  title: string;
}

const Card = (props: Props) => {
  const { componentList, title } = props;
  const [expanded, setExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);

  if (componentList.length === 0) {
    return null;
  }

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={`${styles.cardTitle} ${expanded ? styles.expanded : ''}`}
        onClick={toggleExpand}
      >
        <div className={styles.titleLeft}>
          <span className={styles.icon}>
            <BorderOuterOutlined />
          </span>
          <span className={styles.titleText}>{title}</span>
        </div>
        <div className={styles.expandIcon}>
          {expanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`${styles.contentContainer} ${
          expanded ? styles.contentExpanded : styles.contentCollapsed
        }`}
        style={{
          height: expanded ? 'auto' : '0',
        }}
      >
        <div ref={innerContentRef} className={styles.contentInner}>
          {componentList.map((item) => (
            <ComponentItem componentItemConfig={item} key={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
