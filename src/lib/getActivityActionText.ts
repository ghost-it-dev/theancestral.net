import { PostActivityInterface } from '../models/PostActivity';

const getActivityActionText = (action: PostActivityInterface['action']) => {
  switch (action) {
    case 'create':
      return 'Created';
    case 'update':
      return 'Updated';
    case 'delete':
      return 'Deleted';
    default:
      return 'Unknown';
  }
};

export default getActivityActionText;
