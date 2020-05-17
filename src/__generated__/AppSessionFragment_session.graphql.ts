/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppSessionFragment_session = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "AppSessionFragment_session";
};
export type AppSessionFragment_session$data = AppSessionFragment_session;
export type AppSessionFragment_session$key = {
    readonly " $data"?: AppSessionFragment_session$data;
    readonly " $fragmentRefs": FragmentRefs<"AppSessionFragment_session">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppSessionFragment_session",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Session"
};
(node as any).hash = 'ff98a0bb034a5b56878d0cf9b87c74b6';
export default node;
