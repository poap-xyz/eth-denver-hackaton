import { Event } from "../types/types";
import { useState, useEffect, useContext, memo } from "react";
import Image from "next/image";
import classnames from "classnames";
import dayjs from "dayjs";
import Link from 'next/link'

// import { LayoutContext } from 'context/layout'
import Img from '../components/Img'
// import { imageLoader, getImageUrl, wait } from 'lib'
// import PoapSVG from 'component/Poap/SVG'

import styles from "../styles/EventCard.module.scss";

interface EventCardProps {
  event: Event;
  address: String;
}

const EventCard = ( { address, event }: EventCardProps) => {
  console.log(event);
  if (!event) return null;


  return (
    <Link href={`/address/${address}/${event.id}/feed`}>
    <div className={styles.poap} >
      <div className={styles.background}>
        <Img
          className={styles.animate}
          src={`${event.image_url}`}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <div className={styles.imageAr}>
            <div className={styles.image}>
              <Img src={event.image_url} />
            </div>
          </div>
        </div>

        <div className={styles.name}>
          <h3>{event.name}</h3>
        </div>

        <div className={styles.info}>
          {dayjs(event.start_date).format("MMM D, YYYY")}
          {event.city ? ` - ${event.city}` : ""}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default EventCard;
