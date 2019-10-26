import React from "react";
import PropTypes from 'prop-types';

interface IMoreSessionTrailProps {
  clicked: () => void;
  activated: boolean;
}

const MoreSessionTail = (props: IMoreSessionTrailProps) => {
  return (
    <button onClick={props.clicked}>
      {props.activated ? 'Show less' : 'Show more'}
    </button>
  );
};

MoreSessionTail.propTypes = {
  clicked: PropTypes.func.isRequired,
  activated: PropTypes.bool.isRequired
};

export default MoreSessionTail;
