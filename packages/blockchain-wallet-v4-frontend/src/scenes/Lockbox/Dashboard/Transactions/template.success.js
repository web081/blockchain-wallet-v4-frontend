import { compose, length, prop, reverse, sortBy } from 'ramda'
import { FormattedMessage } from 'react-intl'
import { HeartbeatLoader, Text } from 'blockchain-info-components'
import EmptyTx from 'components/EmptyTx'
import LazyLoadContainer from 'components/LazyLoadContainer'
import NonCustodialTxItem from '../../../Transactions/NonCustodialTx'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const LazyLoadWrapper = styled(LazyLoadContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`

const Row = styled.div`
  justify-content: center;
  display: flex;
  padding: 15px;
  width: 100%;
`

const sortByTime = compose(reverse, sortBy(prop('time')))

const LockboxTransactions = props => {
  const { transactions, transactionsAtBounds, isLoading, loadMore } = props
  return (
    <LazyLoadWrapper onLazyLoad={loadMore}>
      {sortByTime(transactions).map(transaction => (
        <NonCustodialTxItem
          key={transaction.hash}
          coin={transaction.coin}
          currency={props.currency}
          transaction={transaction}
        />
      ))}
      <Row>
        {isLoading ? (
          <HeartbeatLoader />
        ) : transactionsAtBounds ? (
          length(transactions) ? (
            <Text weight={400} size='18px'>
              <FormattedMessage
                id='scenes.lockbox.dashboard.transactions.thatsit'
                defaultMessage="That's it! No more transactions 📭"
              />
            </Text>
          ) : (
            <EmptyTx />
          )
        ) : null}
      </Row>
    </LazyLoadWrapper>
  )
}

LockboxTransactions.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchesApplied: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired
}

export default LockboxTransactions
