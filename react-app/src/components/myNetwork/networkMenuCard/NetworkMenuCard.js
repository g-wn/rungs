import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdPeopleAlt } from 'react-icons/md';
import { getConnections } from '../../../store/connections';
import './NetworkMenuCard.css';

const NetworkMenuCard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const connections = useSelector(state => state.connections);

  useEffect(() => {
    dispatch(getConnections(user.id));
  }, [dispatch, user.id]);

  return (
    <div className='network-menu-card-container'>
      <div className='network-menu-card-header'>Manage my network</div>
      <div className='network-menu-card-links'>
        <div className='network-menu-card-connections-btn'>
          <div className='connections-btn-left'>
            <MdPeopleAlt size={20} /> Connections
          </div>
          <div className='connections-btn-right'>{Object.keys(connections).length}</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMenuCard;
