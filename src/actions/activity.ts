import dbConnect from '@/src/lib/dbConnection';
import Activity from '@/src/models/Activity';

async function getAllActivity() {
  dbConnect();
  const activity = await Activity.find().sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(activity));
}

export { getAllActivity };
