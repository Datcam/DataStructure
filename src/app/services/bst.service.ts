import {Injectable} from '@angular/core';
import {NodeInterface} from '../interfaces/node.interface';

@Injectable()
export class BinarySearchTreeService {
  root: NodeInterface;
  currentNode: NodeInterface;

  constructor() {}

  public createRootNode(value: number): NodeInterface {
    this.root = this.createNode(value);
    this.currentNode = this.root;

    return this.root;
  }

  public createNode(value: number): NodeInterface {
    const newNode = Object.create(BinarySearchTreeService.prototype);
    newNode.value = value;
    newNode.left = undefined;
    newNode.right = undefined;

    return newNode;
  }

  public insert(value: number): void {
    let newNode = this.createNode(value);
    let currentNode = this.currentNode;

    while(currentNode) {
      if (currentNode.value > newNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.value < newNode.value) {
          if (!currentNode.right) {
            currentNode.right = newNode;
            break;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }
  }

  public search(node: NodeInterface, value: number): number {
    let searchNode: number;
    let currentNode = node;

    if (node === null) {
      return null;
    }

    while(currentNode) {
      if (currentNode.value === value) {
        searchNode = currentNode.value;
        break;
      } else if (currentNode.left && value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (currentNode.right && value > currentNode.value) {
        currentNode = currentNode.right;
      }
    }

    return searchNode;
  }

  public findMaxNode(node: NodeInterface): number {
    let currentNode = node;
    let maxValue: number;

    if (!currentNode) {
      return null;
    }

    while(currentNode) {
      if (!currentNode.right) {
        maxValue = currentNode.value;
        break;
      } else {
        currentNode = currentNode.right;
      }
    }

    return maxValue;
  }

  public findMinNode(node: NodeInterface): NodeInterface {
    let currentNode = node;
    let minValue: NodeInterface;

    if (!currentNode) {
      return null;
    }

    while(currentNode) {
      if (!currentNode.left) {
        minValue = currentNode;
        break;
      } else {
        currentNode = currentNode.left;
      }
    }

    return minValue;
  }

  removeNode(root, key) {
    if (root !== null) {
      let current = root;
      let stack = [];

      while (current) {
        stack.push(current);

        if (current.value === key) {
          stack.pop();
          let parent = stack.pop();

          if (!current.left && !current.right) {
            if (parent && parent.left && parent.left.value === current.value) {
              parent.left = undefined;
            } else if (parent) {
              parent.right = undefined;
            } else {
              root = [];
            }
          } else if (current.left && !current.right) {
            if (parent && parent.left && parent.left.value === current.value) {
              parent.left = current.left;
            } else if (parent) {
              parent.right = current.left;
            } else {
              root = current.left;
            }
          } else if (current.right && !current.left) {
            if (parent && parent.left && parent.left.value === current.value) {
              parent.left = current.right;
            } else if (parent) {
              parent.right = current.right;
            } else {
              root = current.right;
            }
          } else {
            let minNode = current.right;
            while (minNode) {
              if (minNode.left) {
                minNode = minNode.left;
              } else {
                break;
              }
            }

            current = this.removeNode(current, minNode.value);

            current.value = minNode.value;
          }
          break;
        }
        else if (key < current.value) {
          current = current.left;
        } else if (key > current.value) {
          current = current.right;
        }
      }
    }

    return root;
  }

  public getRootNode(): NodeInterface {
    if (this.root) {
      return this.root;
    } else {
      return null;
    }
  }
}
