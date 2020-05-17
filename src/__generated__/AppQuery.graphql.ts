/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppQueryVariables = {
    id: string;
};
export type AppQueryResponse = {
    readonly room: {
        readonly id: string;
        readonly title: string;
        readonly sessions: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"AppSessionFragment_session">;
        }> | null;
    } | null;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery(
  $id: ID!
) {
  room(id: $id) {
    id
    title
    sessions {
      id
      ...AppSessionFragment_session
    }
  }
}

fragment AppSessionFragment_session on Session {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Room",
        "kind": "LinkedField",
        "name": "room",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Session",
            "kind": "LinkedField",
            "name": "sessions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AppSessionFragment_session"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Room",
        "kind": "LinkedField",
        "name": "room",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Session",
            "kind": "LinkedField",
            "name": "sessions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery(\n  $id: ID!\n) {\n  room(id: $id) {\n    id\n    title\n    sessions {\n      id\n      ...AppSessionFragment_session\n    }\n  }\n}\n\nfragment AppSessionFragment_session on Session {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = 'd6b6dd7b62d0c38f84af4ec6010e1480';
export default node;
