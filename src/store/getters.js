import storage from '@/utils/storage';

const getters = {
  user: state => state.user || JSON.parse(storage.getUserDetail()),
};
export default getters;
