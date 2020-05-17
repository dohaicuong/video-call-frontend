import { API_ENDPOINT, SUBSCRIPTION_ENDPOINT } from 'configs'

import { Environment, RecordSource, Store, Observable, Disposable } from 'relay-runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,

  loggerMiddleware,
  errorMiddleware,
  // perfMiddleware,
} from 'react-relay-network-modern'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const { NODE_ENV } = process.env

const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: (req) => Promise.resolve(API_ENDPOINT),
    }),
    NODE_ENV !== 'development' ? null : loggerMiddleware(),
    NODE_ENV !== 'development' ? null : errorMiddleware(),
    // NODE_ENV !== 'development' ? null : perfMiddleware(),
  ],
  {
    noThrow: true,
    subscribeFn: (config, variables) => {
      const query = config.text
      if(!query) return

      const subscriptionClient = new SubscriptionClient(SUBSCRIPTION_ENDPOINT, { reconnect: true })
      // @ts-ignore
      return Observable.create(sink => {
        const request = subscriptionClient
          .request({ query, variables })
          .subscribe(sink) 
        // @ts-ignore
        const unsubscribe = request.unsubscribe as Disposable

        return unsubscribe
      })
    }
  }
)

const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
})

export default environment