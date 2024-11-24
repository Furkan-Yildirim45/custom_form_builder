import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableComponent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <ResizableBox width={200} height={100} axis="both" minConstraints={[100, 50]} maxConstraints={[500, 300]}>
        <div style={{ background: 'lightblue', height: '100%', padding: '10px' }}>
          <p>Bu boyutlandırılabilir bir kutudur!</p>
        </div>
      </ResizableBox>
    </div>
  );
};

export default ResizableComponent;
