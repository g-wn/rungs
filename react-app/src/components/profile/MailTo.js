import { NavLink } from 'react-router-dom';

const MailTo = ({ mailTo, label }) => {
  return (
    <NavLink
      to='#'
      onClick={e => {
        e.preventDefault();
        window.location.href = mailTo;
      }}
    >
      {label}
    </NavLink>
  );
};

export default MailTo;
