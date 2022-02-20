import {createPost} from "../utils/api"
import React, { useEffect, useState } from 'react'

const CreatePost = ({events, address}:any) => {
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
        const res = await createPost({address,description,file});
        console.log(await res.data);
        
        //const result = await res.json()
      }
    
      return (
        <form onSubmit={newPost}>
          <label htmlFor="description">Description</label>
          <input id="description" name="description" type="text" required />
          <label htmlFor="file">Image</label>
          <input id="image" name="image" type="file" onChange={(event) =>  {
              const files = event.target.files;
              onFileChange(files ? files[0] : null)}} required />
          <button type="submit">Create Post</button>
        </form>
      )
}

export default CreatePost