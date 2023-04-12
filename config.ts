import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();

export default cleanEnv(process.env, {
  POLYGON_PRIVKEY: str(),
  POLYGON_NODE_URL: str(),
  POLYGON_ETHERSCAN_API: str(),
});
