import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import type {NextPage} from "next";
import dayjs from "dayjs";

import styles from "./Feed.module.scss";
import {getEvent, getPostsByEventId, reaction} from "../../../../utils/api";
import {useStateContext} from "../../../../utils/web3";
import axios from "axios";

type Comment = {
    id: string
    author: string
    image: string
    message: string
    likes: number
    dislikes: number
}

const LikeIcon = () => {
    return (
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(0.490366, 0, 0, 0.453484, 10.869254, 17.943995)">
                <path
                    d="M873.6,372.3H632.1c-9.3,0-13.9-9.3-9.3-18.6c69.6-139.3,46.4-320.4-55.7-343.6c-4.6,0-9.3,0-9.3,0c-46.4,0-83.5,60.3-97.5,106.8c-78.9,218.2-264.6,260-264.6,260H10v612.9h185.7h83.6h366.8c69.6,0,130-37.2,162.5-97.5L920,683.4C1101.1,372.3,873.6,372.3,873.6,372.3z M191.1,906.3H88.9V455.9h102.1V906.3z M841.1,637L841.1,637l-4.6,4.6L725,850.5c-18.6,32.5-51.1,55.7-88.2,55.7H270V428c74.3-32.5,195-116.1,260-287.9c4.6-18.6,13.9-32.5,23.2-41.8c4.6,4.6,4.6,9.3,4.6,9.3c18.6,41.8,23.2,130-18.6,208.9c-13.9,32.5-13.9,65,4.6,92.9c18.6,27.8,46.4,46.4,83.5,46.4h241.4c4.6,0,23.2,4.6,27.9,9.3C906.1,474.5,910.7,525.5,841.1,637z"/>
            </g>
        </svg>
    )
}

const Feed: NextPage = () => {
    const [eventInfo, setEventInfo] = useState<any>(undefined);
    const [posts, setPosts] = useState([]);
    const [eventId, setEventId] = useState<string | undefined | string[]>(undefined);
    const [feed, setFeed] = useState<any[]>([]);
    const {account} = useStateContext();

    const router = useRouter();
    const {address, event: eventIdRouter} = router.query;

    useEffect(() => {
        setEventId(eventIdRouter);
    });

    useEffect(() => {
        if (!eventId) {
            return;
        }

        fetchEvent(eventId).then();
    }, [eventId]);

    const fetchEvent = async (eventId: any) => {
        const event = await getEvent({eventId});
        setEventInfo(event);
    }

    useEffect(() => {
        if (!eventInfo) {
            return;
        }

        fetchPosts(eventId).then();
    }, [eventInfo]);

    const fetchPosts = async (eventId: any) => {
        const posts = await getPostsByEventId({eventId});
        console.log(posts);

        const promises = posts.map(async (post: any) => {
            const ipfs = `https://ipfs.io/ipfs/${post.urlIPFS.split('/')[2]}/metadata.json`;
            const lamierdadeipfs = await axios.get(ipfs);
            const data = await lamierdadeipfs.data;
            const url = data.image;
            const urlPosta = `https://ipfs.io/ipfs/${url.split('/')[2]}/blob`;

            return {
                id: post._id,
                author: post.accountId,
                image: urlPosta,
                message: post.description,
                likes: post.reactions.filter((reaction: any) => reaction.vote > 0).length,
                dislikes: post.reactions.filter((reaction: any) => reaction.vote < 0).length,
                type: post.type,
            }
        });

        const asd = await Promise.all(promises);

        setFeed(asd);
    }

    const handleLike = async (comment: Comment) => {
        await reaction(comment.id, 1, account);
        const aux: any = eventId;
        setEventId(undefined);
        setEventId(aux);
    }

    const handleDislike = async (comment: Comment) => {
        await reaction(comment.id, -1, account);
        const aux: any = eventId;
        setEventId(undefined);
        setEventId(aux);
    }

    if (!eventInfo) {
        return (
            <div className={"loader"}>Loading...</div>
        )
    } else {
        return (
            <div className={styles.page}>

                <div className={styles.event}>
                    <div className={styles.image}>
                        <img src={eventInfo.image_url} alt="" className={styles.image}/>
                    </div>
                    <div className={styles.name}>
                        <h3> {eventInfo.name} </h3>
                    </div>
                    <div className={styles.info}>
                        {dayjs(eventInfo.start_date).format("MMM D, YYYY")}
                        {eventInfo.city ? ` - ${eventInfo.city}` : ""}
                    </div>
                </div>

                <div className={styles.feed}>
                    <div className={styles.title}>
                        <h2>Feed</h2>
                        <Link href={`/address/${address}/${eventId}/create`}>
                            <a className={styles.button}>New Comment</a>
                        </Link>
                    </div>
                    {
                        (feed && feed.length ) ?
                        feed.map(comment => {
                            return (
                                <div className={styles.itemFeed} key={comment.author}>
                                    <div className={styles.cardFeed}>
                                        <div className={styles.header}>
                                            <div className={styles.address}>
                                                {comment.author}
                                            </div>
                                            <div className={styles.actions}>
                                                <div className={styles.like}>
                          <span className={styles.counter}>
                            {comment.likes}
                          </span>
                                                    <div onClick={() => handleLike(comment)}>
                                                        <LikeIcon/>
                                                    </div>
                                                </div>
                                                <div className={styles.dislike}>
                          <span className={styles.counter}>
                            {comment.dislikes}
                          </span>
                                                    <div onClick={() => handleDislike(comment)}>
                                                        <LikeIcon/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.imageFeed}>
                                            {
                                                (comment.type && comment.type.includes('video') &&
                                                    <video autoPlay src={comment.image} controls />) ||
                                                <img src={comment.image} alt="" className=""/>
                                            }
                                        </div>
                                        <div className={styles.commentFeed}>
                                            {comment.message}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className={"loader"}>Loading...</div>
                    }
                </div>
            </div>
        );
    }

};

export default Feed;
