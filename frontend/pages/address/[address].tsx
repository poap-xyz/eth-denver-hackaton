import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import EventCard from "../../components/EventCard";

import { EventData } from "../../types/types";

import styles from "../../styles/Event.module.scss";
import { scan } from "../../utils/api";

const Address: NextPage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { address } = router.query;

  console.log(address);

  useEffect(() => {
    if (address) {
      getEvents(address);
    }
  }, [address]);

  const getEvents = async (address:any) => {
    console.log(address);
    const res = await scan(address);
    console.log(res);
    if (res.data){
      setEvents(res.data);
    }
  };

  if (!address) return <div>Error with address</div>;

  return (
    <>
      <div className={styles.grid}>
        {events.length > 0 &&
          events.map(({ event }: EventData) => (
            <EventCard address={address} key={event.id} event={event} />
          ))}
      </div>
    </>
  );
};

export default Address;
