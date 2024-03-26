import { useEffect } from 'react';
import styles from './index.less';
const Content: React.FC<{ children: React.ReactElement | string }> = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <div className={styles.wrap}>{props.children}</div>;
};
export default Content;
