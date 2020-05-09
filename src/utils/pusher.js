import Pusher from "pusher-js";
import { PUSHER_API_KEY, PUSHER_CLUSTER } from "@/constants";

const pusherObject = new Pusher(PUSHER_API_KEY, { cluster: PUSHER_CLUSTER });

export default pusherObject;
