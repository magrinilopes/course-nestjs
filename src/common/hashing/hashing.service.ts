export abstract class HashingService {
  abstract hash(password: string): Promise<string>;
  abstract compare(passsword: string, hash: string): Promise<boolean>;
}
