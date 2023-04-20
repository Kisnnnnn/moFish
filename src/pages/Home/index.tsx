import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  return (
    <div>
      <Guide name={trim(name)} />
    </div>
  );
};

export default HomePage;
