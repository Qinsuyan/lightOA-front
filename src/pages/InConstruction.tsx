import { history } from '@umijs/max';
import { Button, Result } from 'antd';
const InConstruction: React.FC = () => {
  return (
    <Result
      status="404"
      title="418"
      subTitle={'正在建设中……'}
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          {'返回首页'}
        </Button>
      }
    />
  );
};
export default InConstruction;
