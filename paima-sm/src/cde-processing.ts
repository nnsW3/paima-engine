import type { Pool } from 'pg';

import { ChainDataExtensionDatumType } from '@paima/utils';
import type { ChainDataExtensionDatum } from '@paima/runtime';

import processErc20TransferDatum from './cde-erc20-transfer';
import processErc721TransferDatum from './cde-erc721-transfer';
import processErc721MintDatum from './cde-erc721-mint';
import type { SQLUpdate } from '@paima/db';
import { getSpecificCdeBlockheight } from '@paima/db';

export async function cdeTransitionFunction(
  readonlyDBConn: Pool,
  cdeDatum: ChainDataExtensionDatum
): Promise<SQLUpdate[]> {
  switch (cdeDatum.cdeDatumType) {
    case ChainDataExtensionDatumType.ERC20Transfer:
      return await processErc20TransferDatum(readonlyDBConn, cdeDatum);
    case ChainDataExtensionDatumType.ERC721Transfer:
      return await processErc721TransferDatum(readonlyDBConn, cdeDatum);
    case ChainDataExtensionDatumType.ERC721Mint:
      return await processErc721MintDatum(cdeDatum);
    default:
      throw new Error(`[paima-sm] Unknown type on CDE datum: ${cdeDatum}`);
  }
}

export async function getProcessedCdeDatumCount(
  readonlyDBConn: Pool,
  blockHeight: number
): Promise<number> {
  const cdeStatus = await getSpecificCdeBlockheight.run(
    { block_height: blockHeight },
    readonlyDBConn
  );
  if (cdeStatus.length === 0) {
    return 0;
  }
  return cdeStatus[0].datum_count;
}
