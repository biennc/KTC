import Form1 from "./auth/Form1";
import Form2 from "./auth/Form2";
import Form3 from "./auth/Form3";

const App: React.FC = () => {

  return (
    <>
      <Form1 />
      <Form2 initialEmail={""} />
      <Form3 />
    </>
  );
};

export default App