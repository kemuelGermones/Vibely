import { Fragment } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function IconButton({ disabled, onClick, content, children }) {
  return (
    <Fragment>
      <button type="button" disabled={disabled} onClick={onClick}>
        <div data-tooltip-id="icon" data-tooltip-content={content}>
          {children}
        </div>
      </button>
      <Tooltip id="icon" place="bottom" />
    </Fragment>
  );
}

export default IconButton;
