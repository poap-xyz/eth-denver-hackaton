import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import EventCard from "../../components/EventCard";

import { EventData } from "../../types/types";

import styles from "../../styles/Event.module.scss";

const Address: NextPage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { address } = router.query;

  console.log(address);

  useEffect(() => {
    if (address) {
      getEvents();
    }
  }, [address]);

  const getEvents = async () => {
    const res = await fetch(`https://api.poap.xyz/actions/scan/${address}`);
    const events = await res.json();
    setEvents(events);
  };

  if (!address) return <div>Error with address</div>;

  return (
    <>
      <div className={styles.grid}>
        {events.length > 0 &&
          events.map(({ event }: EventData) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </>
  );
};

export default Address;
