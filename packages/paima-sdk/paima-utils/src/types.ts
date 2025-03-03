export type Deployment = 'C1' | 'A1';

export type ErrorCode = number;
export type ErrorMessageFxn = (errorCode: ErrorCode) => string;
export type ErrorMessageMapping = Record<ErrorCode, string>;

// TOOD: remove?
export type ETHAddress = string;
export type CardanoAddress = string;
export type PolkadotAddress = string;
export type AlgorandAddress = string;
export type MinaAddress = string;

export type WalletAddress =
  | ETHAddress
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- the overlapping types is on purpose for readability
  | CardanoAddress
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- the overlapping types is on purpose for readability
  | PolkadotAddress
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- the overlapping types is on purpose for readability
  | AlgorandAddress
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- the overlapping types is on purpose for readability
  | MinaAddress;

export type ContractAddress = ETHAddress;

export type Hash = string;
export type URI = string;
export type UserSignature = string;

export type InputDataString = string;

export type VersionString = `${number}.${number}.${number}`;

export type TransactionTemplate = {
  data: string;
  to: string;
  gasPrice: string;
};

export type NonceString = string;

export interface SubmittedData {
  /** Address of the wallet that submitted the data. */
  realAddress: WalletAddress;
  inputData: InputDataString;
  inputNonce: NonceString;
  suppliedValue: string;
  scheduled: boolean;
  dryRun?: boolean;
  caip2: string;
  txHash: string;
}

export interface STFSubmittedData extends SubmittedData {
  /** Mapped address to main wallet. */
  userAddress: WalletAddress;
  /** Fixed User ID */
  userId: number;
  /** Transaction hash of Primitive that triggered this scheduled data, if known. */
  scheduledTxHash?: string;
  /** Name/id of the extension that triggered this event, if known */
  extensionName?: string;
}

export type SubmittedChainData = SubmittedData;
