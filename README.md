Tree Viewer
===========
A tree display using [react-tree-graph](https://github.com/jpb12/react-tree-graph), based on the example at http://bl.ocks.org/d3noob/8375092, with several additional features. [Demo](https://jpb12.github.io/tree-viewer/):

![tree](https://raw.githubusercontent.com/jpb12/tree-viewer/gh-pages/images/tree.png)

Resizing
--------
The tree will automatically resize itself as the page does.

Subtrees
--------
Clicking on a node will redraw the tree, with that node as the root.  Clicking the reset button will undo this.

Filtering
---------
Typing into the textbox will redraw the tree only showing nodes that match one of the following conditions:

1. The node contains the filter text (case insensitive)
2. One of the node's descendants fulfils condition 1.
3. One of the node's ancestors fulfils condition 1, and none of that ancestor's descendants do.

In addition, nodes that match the text will be bolded, and other nodes shown will be faded.  Clicking the rest button will clear the filter.

Developers
----------
Tree Viewer is implemented in react + redux, and bundled by webpack.  The tree is statically imported from json.js.  This can be replaced with an alternative method, like an AJAX call.

To run locally, after cloning the repository, run:

```sh
npm install
npm run build-dev
```
