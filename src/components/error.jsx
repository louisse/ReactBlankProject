// import BxBxsError from "../icons/icons.js";

const ErrorBox = ({ message }) => {
  if (!message) return null;
  return (
    <>
      <div className="error-message">
        {/* <BxBxsError /> */}
        {message}
      </div>
    </>
  );
};

export default ErrorBox;
