export default class Stack<T = any> {
  private _data: T[] = []
  push(v: T) { this._data.push(v) }
  pop(): T | undefined { return this._data.pop() }
  peek(): T | undefined { return this._data[this._data.length - 1] }
  isEmpty() { return this._data.length === 0 }
  size() { return this._data.length }
  clear() { this._data = [] }
  toArray() { return [...this._data] }
}

