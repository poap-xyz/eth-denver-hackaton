import { Event } from "../types/types";
import { useState, useEffect, useContext, memo } from "react";
import Image from "next/image";
import classnames from "classnames";
import dayjs from "dayjs";
// import { LayoutContext } from 'context/layout'
// import Img from 'component/Layout/Img'
// import { imageLoader, getImageUrl, wait } from 'lib'
// import PoapSVG from 'component/Poap/SVG'

import styles from "../styles/EventCard.module.scss";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  if (!event) return null;
  return (
    <div className={styles.poap}>
      <div className={styles.background}>
        <Image
          className={styles.animate}
          src={`${event.image_url}`}
          width={315}
          height={315}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <div className={styles.imageAr}>
            <div className={styles.image}>
              <Image src={event.image_url} width={150} height={150} />
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
  );
};

export default EventCard;
