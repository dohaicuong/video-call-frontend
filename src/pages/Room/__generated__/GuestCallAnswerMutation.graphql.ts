/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AnswerSignallingInput = {
    roomId: string;
    sessionId: string;
    sdpAnswer: unknown;
    iceCandidates: Array<unknown>;
};
export type GuestCallAnswerMutationVariables = {
    input: AnswerSignallingInput;
};
export type GuestCallAnswerMutationResponse = {
    readonly answerSignalling: boolean | null;
};
export type GuestCallAnswerMutation = {
    readonly response: GuestCallAnswerMutationResponse;
    readonly variables: GuestCallAnswerMutationVariables;
};



/*
mutation GuestCallAnswerMutation(
  $input: AnswerSignallingInput!
) {
  answerSignalling(input: $input)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "AnswerSignallingInput!"
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
    "kind": "ScalarField",
    "name": "answerSignalling",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GuestCallAnswerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GuestCallAnswerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "GuestCallAnswerMutation",
    "operationKind": "mutation",
    "text": "mutation GuestCallAnswerMutation(\n  $input: AnswerSignallingInput!\n) {\n  answerSignalling(input: $input)\n}\n"
  }
};
})();
(node as any).hash = '69ad532a16aef8614e942dd61c714fec';
export default node;
