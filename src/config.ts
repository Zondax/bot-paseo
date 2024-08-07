let config: Config | undefined

export type Config = {
  chainDecimals: number
  balanceThreshold: number
  balanceTarget: number
  nodeUrl: string
  rootMnemonic: string
  statsApiUrl: string
  logLevel?: string
  dryRun: boolean
  addressToSlash?: string
  runInBatch: boolean
}

/**
 * Loads the configuration from environment variables and returns a Config object.
 * Throws an error if required environment variables are missing.
 *
 * @returns {Config} The configuration object populated with values from the environment variables.
 * @throws {Error} If any required environment variables are missing.
 */
function loadConfig() {
  const chainDecimals = parseInt(process.env.CHAIN_DECIMALS ?? '0')
  const balanceThreshold = parseInt(process.env.BALANCE_THRESHOLD ?? '0')
  const balanceTarget = parseInt(process.env.BALANCE_TARGET ?? '0')
  const nodeUrl = process.env.NODE_URL
  const rootMnemonic = process.env.ROOT_MNEMONIC
  const statsApiUrl = process.env.STATS_API_URL
  const addressToSlash = process.env.FORCED_ADDRESS_TO_SLASH
  const logLevel = process.env.LOG_LEVEL ?? 'info'
  const dryRun = Boolean(process.env.DRY_RUN)
  const runInBatch = Boolean(process.env.RUN_IN_BATCH)

  if (!chainDecimals) {
    throw new Error('Missing CHAIN_DECIMALS')
  }

  if (!balanceThreshold) {
    throw new Error('Missing BALANCE_THRESHOLD')
  }

  if (!balanceTarget) {
    throw new Error('Missing BALANCE_TARGET')
  }

  if (!rootMnemonic) {
    throw new Error('Missing ROOT_MNEMONIC')
  }

  if (!statsApiUrl || !nodeUrl) {
    throw new Error('Missing NODE_URL or STATS_API_URL')
  }

  return {
    chainDecimals,
    nodeUrl,
    statsApiUrl,
    logLevel,
    balanceTarget,
    balanceThreshold,
    rootMnemonic,
    dryRun,
    runInBatch,
    addressToSlash,
  }
}
/**
 * Retrieves the application configuration. If the configuration has not been loaded yet,
 * it calls loadConfig to load the configuration from environment variables.
 *
 * @returns {Config} The loaded configuration object.
 */
export function getConfig(): Config {
  if (!config) {
    config = loadConfig()
    return config
  }

  return config
}
