import cryptojs from "crypto-js";

export default class CommonUtils {
  /*Declare secretKey variable to store the secret key for encryption*/
  private secretKey: string;

  constructor() {
    //const secretKey = ;
    if (process.env.SECRET_KEY) {
      this.secretKey = process.env.SECRET_KEY;
    } else {
      throw new Error("Please provide a SECRET_KEY.");
    }
  }
  /*
   poivide encypt data
   @param data : string
   @returns encryptedData
*/
  public encryptData(data: string): string {
    const encryptedData = cryptojs.AES.encrypt(data, this.secretKey).toString();
    return encryptedData;
  }
  /*
   poivide decrypt data
   @param encryptedData : string
   @returns decryptedData
*/
  public decryptData(encryptedData: string): string {
    const decryptedData = cryptojs.AES.decrypt(encryptedData, this.secretKey).toString(cryptojs.enc.Utf8);
    return decryptedData;
  }
}
