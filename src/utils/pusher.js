import { PUSHER_API_KEY, PUSHER_CLUSTER } from "@/constants";

const pusherConfig = {
  api_key: PUSHER_API_KEY,
  options: {
    cluster: PUSHER_CLUSTER,
    encrypted: true
  }
};

export default pusherConfig;
