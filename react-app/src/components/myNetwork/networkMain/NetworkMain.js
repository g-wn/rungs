import SingleConnectionCard from '../singleConnection/SingleConnectionCard';
import './NetworkMain.css';

const NetworkMain = ({ networkCategory, displaying }) => {
  const networkCategoryArray = Object.values(networkCategory);

  return (
    <div className='network-content-container'>
      {networkCategoryArray.length > 0 ? (
        networkCategoryArray.map((connection, idx) => (
          <div
            className='single-connection'
            key={idx}
          >
            <SingleConnectionCard
              user={connection}
              displaying={displaying}
            />
          </div>
        ))
      ) : displaying === 'connections' ? (
        <div className='no-connections-message'>No connections, yet.</div>
      ) : displaying === 'followers' ? (
        <div className='no-connections-message'>No followers, yet.</div>
      ) : (
        <div className='no-connections-message'>You're not following anyone, yet.</div>
      )}
    </div>
  );
};

export default NetworkMain;
