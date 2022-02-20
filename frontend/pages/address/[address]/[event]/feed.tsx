import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import type { NextPage } from "next";

import styles from "./Feed.module.scss";

const Feed: NextPage = () => {
  const [feed, setFeed] = useState([
    { 
      id: '123', 
      author: 'Pepito.eth',
      image: 'https://via.placeholder.com/600x400',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
    },
    { 
      id: '123', 
      author: 'lelele.eth',
      image: 'https://via.placeholder.com/1200x600',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 
    },
    { 
      id: '123', 
      author: 'sasasa.eth',
      image: 'https://via.placeholder.com/600x200',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 
    },
  ]);
  const router = useRouter();

  const { address, event } = router.query;

  return (
    <div className={styles.page}>

      <div className={styles.event}>
        <div className={styles.image}>
          <img src="https://poap9.imgix.net/spearbit-happy-hour-eth-denver-2022-logo-1644954484748.png" alt="" className="ui-img client loaded" />
        </div>
        <div className={styles.name}>
          <h3>Spearbit Happy Hour @ ETH Denver lsdh flaskdhf lasdkhf </h3>
        </div>
        <div className={styles.info}>
          Feb 18, 2022 - ETHDenver
        </div>
      </div>

      <div className={styles.feed}>
        <div className={styles.title}>
          <h2>Feed</h2>
          <Link href={`/address/${address}/${event}/create`}>
            <a className={styles.button}>New Comment</a>
          </Link>
        </div>
        { 
          feed.map( comment => {
            return (
              <div className={styles.itemFeed}>
                <div className={styles.cardFeed}>
                  <div className={styles.address}>{comment.author}</div>
                  <div className={styles.imageFeed}>
                    <img height="200px" src={comment.image} alt="" className="" />
                  </div>
                  <div className={styles.commentFeed}>
                    {comment.message}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Feed;
