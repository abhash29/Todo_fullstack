import Header from './Header';
import InputBox from './InputBox';

import List from './List';

function Component() {
  return (
    <div className="h-auto w-auto border-4 border-black bg-white p-4 rounded-lg shadow-md">
      <Header />
      <InputBox />
      <List />
    </div>
  );
}

export default Component;
