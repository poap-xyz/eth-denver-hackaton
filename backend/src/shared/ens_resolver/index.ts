import axios from "axios";

export type ENS = {
    valid: boolean;
    ens: string;
    address: string;
}

export class ENSResolver {
    constructor() { }
    async resolve({ addresses }: { addresses: string[]; }): Promise<ENS> {
        const res = Promise.all(addresses.map(async (address) => {
            const req = await axios.get(`https://api.poap.xyz/actions/ens/${address}`);
            return req.data;
        }))
        return res as unknown as ENS;
    }
}
