import { ENV } from './config.js';

export function getInvalidEnvVars(): string[] {
  const missingVars: Array<keyof typeof ENV> = [];

  const MANDATORY_TRUTHY_VARS: ReadonlyArray<keyof typeof ENV> = [
    // Blockchain
    'DEFAULT_FEE',
    'BATCHER_PRIVATE_KEY',

    // Webserver:
    'BATCHER_PORT',

    // DB:
    'BATCHER_DB_HOST',
    'BATCHER_DB_USER',
    'BATCHER_DB_PW',
    'BATCHER_DB_NAME',
    'BATCHER_DB_PORT',

    // Validation parameters:
    'GAME_INPUT_VALIDATOR_PERIOD',
    'BATCHED_TRANSACTION_POSTER_PERIOD',
    'BATCHED_MESSAGE_SIZE_LIMIT',
    'MAX_USER_INPUTS_PER_MINUTE',
    'MAX_USER_INPUTS_PER_DAY',
  ] as const;

  for (const varname of MANDATORY_TRUTHY_VARS) {
    if (!ENV[varname]) {
      missingVars.push(varname);
    }
  }

  if (ENV.BATCHER_NETWORK && ENV.BATCHER_NETWORK === 'avail') {
    if (!ENV['SECURITY_NAMESPACE']) {
      missingVars.push('SECURITY_NAMESPACE');
    }
  } else {
    if (!ENV['CONTRACT_ADDRESS']) {
      missingVars.push('CONTRACT_ADDRESS');
    }
  }

  if (ENV.DEFAULT_VALIDATION_ACTIVE && !ENV.GAME_NODE_URI) {
    missingVars.push('GAME_NODE_URI');
  }

  if (ENV.SELF_SIGNING_ENABLED && !ENV.SELF_SIGNING_API_KEY) {
    missingVars.push('SELF_SIGNING_API_KEY');
  }

  return missingVars;
}
