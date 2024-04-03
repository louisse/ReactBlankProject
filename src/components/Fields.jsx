import { Inputs } from "../constants/input";
import ErrorBox from "../components/error.jsx";

export default function Fields({ formState, setFormState }) {
  const handleChange = (value, inputValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [value]: {
        ...prevState[value],
        value: inputValue,
      },
    }));
  };

  return Inputs.map((input) => (
    <div className="form-field" key={input.value}>
      <label className="label">{input.label}</label>
      <input
        type={input.type}
        placeholder={input.placeholder}
        onChange={(e) => handleChange(input.value, e.target.value)}
        defaultValue={
          input.value === "username" ? formState[input.value].value : ""
        }
        className={
          !!formState[input.value].error ? "input error-field" : "input"
        }
      />
      <ErrorBox message={formState[input.value].error} />
    </div>
  ));
}
