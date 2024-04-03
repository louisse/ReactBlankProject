import { Inputs } from "../constants/input";
import ErrorBox from "../components/error.jsx";
import { EyeIcon } from "../icons/icons.jsx";
import { useRef } from "react";

export default function Fields({ formState, setFormState }) {
  const passwordRef = useRef(null);
  const handleChange = (value, inputValue) => {
    setFormState((prevState) => ({
      ...prevState,
      [value]: {
        ...prevState[value],
        value: inputValue,
      },
    }));
  };
  const handleHideShowPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };
  return Inputs.map((input) => (
    <div className="form-field" key={input.value}>
      <label className="label">{input.label}</label>
      <div className="relative">
        <input
          type={input.type}
          placeholder={input.placeholder}
          onChange={(e) => handleChange(input.value, e.target.value)}
          value={formState[input.value].value}
          className={
            "input " + (!!formState[input.value].error ? "error-field" : "")
          }
          ref={input.value === "password" ? passwordRef : null}
        />
        {input.value === "password" ? (
          <div className="eye-icon-wrapper" onClick={handleHideShowPassword}>
            <EyeIcon />
          </div>
        ) : null}
      </div>

      <ErrorBox message={formState[input.value].error} />
    </div>
  ));
}
