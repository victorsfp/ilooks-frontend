import { HTMLAttributes } from "react";

interface ButtonPrimaryProps extends HTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button" | "reset";
  loading?: boolean;
}

const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const { children, type = "button" } = props;

  return (
    <button
      className="btn btn-primary"
      type={type}
      {...props}
      disabled={props.loading ? true : false}
    >
      {props.loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>{" "}
        </>
      ) : (
        <></>
      )}
      {children}
    </button>
  );
};

export default ButtonPrimary;
