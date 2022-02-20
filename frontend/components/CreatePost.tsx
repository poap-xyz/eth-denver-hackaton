import {createPost} from "../utils/api"
import React, { useEffect, useState } from 'react'
import styles from "../styles/Create.module.scss";
import { useRouter } from 'next/router'

const CreatePost = ({eventId, address}:any) => {
    const [dataUri, setDataUri] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [disabled, setDisable] =useState(false);
    const router = useRouter();

    const onFileChange = (file: any) => {
        if(!file) {
            setDataUri('');
            return;
        }
        setImage(file);
    }

    const newPost = async (event:any) => {
        event.preventDefault();
        setDisable(true);
        const description = event.target.description.value;
        if(!image) {
            setDisable(false);
            return;
        }
        setDisable(true);
        const file = new Blob([image], {type: image.type})
        const res = await createPost({address,description,file, eventId: +eventId});
        router.back()
      }
    
      return (
        <form onSubmit={newPost} className={styles.homeBox}>
          <label htmlFor="description" className={styles.name}>Description</label>
          <textarea id="description" name="description" required className={styles.input}></textarea>
          <label htmlFor="file" className={styles.name}>Image</label>
          <input id="image" name="image" type="file" onChange={(event) =>  {
              const files = event.target.files;
              onFileChange(files ? files[0] : null)}} required />
          <button type="submit" className={styles.button} disabled={disabled}>Create Post</button>
        </form>
      )
}

export default CreatePost