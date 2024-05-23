import { useState } from "react";
import Game from "./Game";

function App() {
  const init = { nrows: 10, ncols: 10, nmines: 10 };
  const [config, setConfig] = useState(init);
  const [input, setInput] = useState(init);

  function handleArg(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: parseInt(e.target.value) });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Input validation, make sure number of mines makes sense
    setConfig({ ...input });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {[["Rows: ", "nrows"], ["Columns: ", "ncols"], ["Mines: ", "nmines"]].map(([label, name]) => (
          <label>
            {label}
            <input type="number" min={5} max={100} defaultValue={10} name={name} onChange={handleArg} />
          </label>
        ))}
        <input type="submit" value="submit" />
      </form>
      <Game nrows={config.nrows} ncols={config.ncols} nmines={config.nmines} />
    </>
  );
}

export default App;
