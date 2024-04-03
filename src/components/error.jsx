import { BxBxsError } from "../icons/icons";

const ErrorBox = ({ message }) => {
  if (!message) return <div className="vSpacer33"></div>;
  return (
    <>
      <div className="error-message">
        <div>
          <BxBxsError />
        </div>
        {message}
      </div>
    </>
  );
};

export default ErrorBox;
