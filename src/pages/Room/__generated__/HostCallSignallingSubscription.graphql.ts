/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type HostCallSignallingSubscriptionVariables = {
    roomId: string;
};
export type HostCallSignallingSubscriptionResponse = {
    readonly signalling: {
        readonly sdpAnswer: unknown;
        readonly iceCandidates: ReadonlyArray<unknown>;
    } | null;
};
export type HostCallSignallingSubscription = {
    readonly response: HostCallSignallingSubscriptionResponse;
    readonly variables: HostCallSignallingSubscriptionVariables;
};



/*
subscription HostCallSignallingSubscription(
  $roomId: ID!
) {
  signalling(roomId: $roomId) {
    sdpAnswer
    iceCandidates
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "roomId",
    "type": "ID!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "roomId",
        "variableName": "roomId"
      }
    ],
    "concreteType": "SignallingPayload",
    "kind": "LinkedField",
    "name": "signalling",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sdpAnswer",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "iceCandidates",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HostCallSignallingSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HostCallSignallingSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "HostCallSignallingSubscription",
    "operationKind": "subscription",
    "text": "subscription HostCallSignallingSubscription(\n  $roomId: ID!\n) {\n  signalling(roomId: $roomId) {\n    sdpAnswer\n    iceCandidates\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d37dac96078cb9cc0b20668269b4cad';
export default node;
