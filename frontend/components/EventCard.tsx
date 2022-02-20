import { Event } from "../types/types";
import dayjs from "dayjs";
import Link from 'next/link'

import styles from "../styles/EventCard.module.scss";

interface EventCardProps {
  event: Event;
  address: any;
}

const EventCard = ( { address, event }: EventCardProps) => {
  if (!event) return null;
  return (
    <Link href={`/address/${address}/${event.id}/feed`}>
      <div className={styles.event}>
        <div className={styles.image}>
          <img src={event.image_url} alt="" className={styles.image} />
        </div>
        <div className={styles.name}>
          <h3>{event.name}</h3>
        </div>
        <div className={styles.info}>
          {dayjs(event.start_date).format("MMM D, YYYY")}
          {event.city ? ` - ${event.city}` : ""}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
