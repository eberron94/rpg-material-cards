import { hri } from 'human-readable-ids';
const randomName = () => hri.random().replace(/-/g, ' ').replace(/[0-9]/g,'').trim();

export default {
    randomName,
};
