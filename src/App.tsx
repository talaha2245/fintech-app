import { BrowserRouter, Routes, Route } from "react-router-dom";
import Model1 from "./components/model1/model1";
import Model2 from "./components/model2/model2";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Model1 />} />
        <Route path="/model" element={<Model2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
