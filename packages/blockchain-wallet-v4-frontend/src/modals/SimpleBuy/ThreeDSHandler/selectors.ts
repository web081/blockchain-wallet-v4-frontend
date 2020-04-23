import { lift } from 'ramda'
import { RootState } from 'data/rootReducer'
import { selectors } from 'data'

export const getData = (state: RootState) => {
  const cardR = selectors.components.simpleBuy.getSBCard(state)
  const providerDetailsR = selectors.components.simpleBuy.getSBProviderDetails(
    state
  )
  const threeDSDetailsR = selectors.components.simpleBuy.getEverypay3DSDetails(
    state
  )
  const domains = selectors.core.walletOptions.getDomains(state).getOrElse({
    walletHelper: 'https://wallet-helper.blockchain.com'
  })

  const transform = (card, providerDetails, threeDSDetails) => ({
    card,
    domains,
    providerDetails,
    threeDSDetails
  })

  return lift(transform)(cardR, providerDetailsR, threeDSDetailsR)
}
