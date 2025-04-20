import { GameField } from './game/components/GameField';

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-center font-bold">Hey</h1>
      <div className="flex grow justify-center items-center">
        <GameField />
      </div>
    </div>
  );
};

export default App;
