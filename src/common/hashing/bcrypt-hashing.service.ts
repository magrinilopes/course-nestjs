import { HashingService } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptHashingService extends HashingService {
  async hash(passsword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passsword, salt);
    return hash;
  }

  async compare(passsword: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(passsword, hash);
    return isValid;
  }
}
