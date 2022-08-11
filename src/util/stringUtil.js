import { hri } from 'human-readable-ids';
const randomName = () => hri.random().replace(/-/g, ' ');

export default {
    randomName,
};
