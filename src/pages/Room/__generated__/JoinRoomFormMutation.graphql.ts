/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RoomJoinInput = {
    roomId: string;
    sessionName: string;
    sdpOffer?: unknown | null;
    iceCandidates?: Array<unknown> | null;
};
export type JoinRoomFormMutationVariables = {
    input: RoomJoinInput;
};
export type JoinRoomFormMutationResponse = {
    readonly roomJoin: {
        readonly sdpOffer: unknown | null;
        readonly iceCandidates: ReadonlyArray<unknown> | null;
        readonly session: {
            readonly id: string;
        } | null;
    } | null;
};
export type JoinRoomFormMutation = {
    readonly response: JoinRoomFormMutationResponse;
    readonly variables: JoinRoomFormMutationVariables;
};



/*
mutation JoinRoomFormMutation(
  $input: RoomJoinInput!
) {
  roomJoin(input: $input) {
    sdpOffer
    iceCandidates
    session {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "RoomJoinInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RoomJoinPayload",
    "kind": "LinkedField",
    "name": "roomJoin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sdpOffer",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "iceCandidates",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Session",
        "kind": "LinkedField",
        "name": "session",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
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
    "name": "JoinRoomFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinRoomFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "JoinRoomFormMutation",
    "operationKind": "mutation",
    "text": "mutation JoinRoomFormMutation(\n  $input: RoomJoinInput!\n) {\n  roomJoin(input: $input) {\n    sdpOffer\n    iceCandidates\n    session {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '08144ff4c2e91f739180fec59177ff89';
export default node;
