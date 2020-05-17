/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RoomCreateInput = {
    title: string;
};
export type HomeRoomCreateMutationVariables = {
    input: RoomCreateInput;
};
export type HomeRoomCreateMutationResponse = {
    readonly roomCreate: {
        readonly id: string;
    } | null;
};
export type HomeRoomCreateMutation = {
    readonly response: HomeRoomCreateMutationResponse;
    readonly variables: HomeRoomCreateMutationVariables;
};



/*
mutation HomeRoomCreateMutation(
  $input: RoomCreateInput!
) {
  roomCreate(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "RoomCreateInput!"
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
    "concreteType": "Room",
    "kind": "LinkedField",
    "name": "roomCreate",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeRoomCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeRoomCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "HomeRoomCreateMutation",
    "operationKind": "mutation",
    "text": "mutation HomeRoomCreateMutation(\n  $input: RoomCreateInput!\n) {\n  roomCreate(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'df99c75edb0e5c310e270e1c9d5cab3f';
export default node;
