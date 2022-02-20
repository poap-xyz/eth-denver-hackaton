import { useRouter } from 'next/router'
import CreatePost from '../../../../components/CreatePost';
import { useStateContext } from "../../../../utils/web3";

const Create = () => {
  const { account } = useStateContext();
  const router = useRouter();
  const { address, event } = router.query;
  return (
    <>
        <CreatePost event={event} address={account}/>
    </>
    );
}

export default Create;