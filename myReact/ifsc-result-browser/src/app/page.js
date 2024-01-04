// src/app/page.js
import EventCard from './components/eventCard';
import eventData from '../data/yearEventData.json'; // adjust the path to your JSON file

const Page = () => {
  return (
    <div>
      <EventCard eventData={eventData} />
    </div>
  );
};

export default Page;
