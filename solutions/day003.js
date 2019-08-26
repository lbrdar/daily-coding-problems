const assert = require('../chai').assert;

/**
 * This problem was asked by Google.
 *
 * Given the root to a binary tree, implement serialize(root), which serializes the tree into a
 * string, and deserialize(s), which deserializes the string back into the tree.
 *
 * For example, given the following Node class
 *    class Node:
 *      def __init__(self, val, left=None, right=None):
 *        self.val = val
 *        self.left = left
 *        self.right = right
 *
 * The following test should pass:
 *  node = Node('root', Node('left', Node('left.left')), Node('right'))
 *  assert deserialize(serialize(node)).left.left.val == 'left.left'
 */


class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const DELIMITER = '__';
const LEFT = '<<';
const RIGHT = '>>';
const UP = '^^';

function strip(s) {
  return s.replace(new RegExp(`[${DELIMITER}${LEFT}${RIGHT}${UP}]`, 'g'), '');
}

function serialize(root) {
  if (!root instanceof Node) {
    throw new Error('Expected root to be an instance of Node');
  }

  if (!root) {
    return '';
  }

  let string = DELIMITER + root.val + DELIMITER;

  if (root.left) {
    string += LEFT + serialize(root.left) + UP;
  }

  if (root.right) {
    string += RIGHT + serialize(root.right) + UP;
  }

  return string;
}

function deserialize(s) {
  if (!s) {
    return null;
  }

  if (typeof s !== 'string') {
    throw new Error('Expected argument to be string');
  }

  let end = s.length;
  let leftChildIndex = 0;
  let rightChildIndex = 0;
  let level = 0;
  for (let i = 2 * DELIMITER.length; i < s.length; i++) {
    if (s.slice(i, i + LEFT.length) === LEFT) {
      if (level === 0) {
        leftChildIndex = i + LEFT.length;
      }
      level++;
      i = i + LEFT.length - 1;
    } else if (s.slice(i, i + RIGHT.length) === RIGHT) {
      if (level === 0) {
        rightChildIndex = i + RIGHT.length;
        break;
      }
      level++;
      i = i + RIGHT.length - 1;
    } else if (s.slice(i, i + UP.length) === UP) {
      level--;
      i = i + UP.length - 1;
    }
  }

  if (leftChildIndex && (!rightChildIndex || leftChildIndex < rightChildIndex)) {
    end = leftChildIndex - LEFT.length;
  } else if (rightChildIndex && (!leftChildIndex || rightChildIndex < leftChildIndex)) {
    end = rightChildIndex - RIGHT.length;
  }

  const value = s.slice(0, end);
  const left = leftChildIndex ? s.slice(leftChildIndex, rightChildIndex ? rightChildIndex - RIGHT.length : s.length) : null;
  const right = rightChildIndex ? s.slice(rightChildIndex, s.length) : null;

  return new Node(strip(value), deserialize(left), deserialize(right));
}


assert.equal(deserialize(serialize(new Node('root'))).left, null);
assert.equal(deserialize(serialize(new Node('root'))).right, null);
assert.equal(deserialize(serialize(new Node('root'))).val, 'root');

const node1 = new Node(
  'root',
  new Node('left', new Node('left.left')),
  new Node('right')
);
assert.equal(deserialize(serialize(node1)).left.left.val, 'left.left');

const node2 = new Node(
  'root',
  null,
  new Node(
    'right',
    new Node('right.left'),
    new Node(
      'right.right',
      new Node('right.right.left', new Node('right.right.left.left'), new Node('right.right.left.right')),
      new Node('right.right.right')
    )
  )
);
assert.equal(deserialize(serialize(node2)).right.right.right.val, 'right.right.right');
assert.equal(deserialize(serialize(node2)).right.right.left.right.val, 'right.right.left.right');

