import SingleConnectionCard from '../singleConnection/SingleConnectionCard';
import './NetworkMain.css';

const NetworkMain = ({ networkCategory, displaying }) => {
  const networkCategoryArray = Object.values(networkCategory);
  console.log(networkCategoryArray)

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
      ) : (
        <div className='no-connections-message'>YOU DON'T HAVE ANY CONNECTIONS</div>
      )}
    </div>
  );
};

export default NetworkMain;
