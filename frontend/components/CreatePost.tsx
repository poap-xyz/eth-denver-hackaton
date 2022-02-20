import {createPost} from "../utils/api"
import React, { useEffect, useState } from 'react'
import styles from "../styles/Create.module.scss";

const CreatePost = ({eventId, address}:any) => {
    const [dataUri, setDataUri] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const onFileChange = (file: any) => {
        if(!file) {
            setDataUri('');
            return;
        }
        setImage(file);
    }

    const newPost = async (event:any) => {
        event.preventDefault();
        const description = event.target.description.value;
        if(!image) {
            return;
        }
        const file = new Blob([image], {type: image.type})
        const res = await createPost({address,description,file, eventId: +eventId});
        console.log(await res.data);
      }
    
      return (
        <form onSubmit={newPost} className={styles.homeBox}>
          <label htmlFor="description" className={styles.name}>Description</label>
          <input id="description" name="description" type="text" required className={styles.input}/>
          <label htmlFor="file" className={styles.name}>Image</label>
          <input id="image" name="image" type="file" onChange={(event) =>  {
              const files = event.target.files;
              onFileChange(files ? files[0] : null)}} required />
          <button type="submit" className={styles.button}>Create Post</button>
        </form>
      )
}

export default CreatePost