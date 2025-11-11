export type TreeNode<T = any> = {
  id: string
  name: string
  data?: T
  children: TreeNode<T>[]
}

export function createNode<T>(id: string, name: string, data?: T): TreeNode<T> {
  return { id, name, data, children: [] }
}

// Construye un árbol N-ario a partir de una lista plana con parentId
export function buildTree<T extends { id: string; name: string; parentId?: string | null; [k: string]: any }>(
  list: T[],
): TreeNode<T>[] {
  const byId = new Map<string, TreeNode<T>>()
  const roots: TreeNode<T>[] = []
  for (const item of list) {
    byId.set(item.id, { id: item.id, name: item.name, data: item as any, children: [] })
  }
  for (const item of list) {
    const node = byId.get(item.id)!
    const pid = (item as any).parentId ?? null
    if (!pid) roots.push(node)
    else {
      const parent = byId.get(pid)
      if (parent) parent.children.push(node)
      else roots.push(node) // si parent no existe, tratar como root
    }
  }
  return roots
}

// DFS (preorden)
export function dfs<T>(nodes: TreeNode<T>[], visit: (n: TreeNode<T>) => void) {
  const walk = (n: TreeNode<T>) => {
    visit(n)
    for (const c of n.children) walk(c)
  }
  for (const n of nodes) walk(n)
}

// BFS
export function bfs<T>(nodes: TreeNode<T>[], visit: (n: TreeNode<T>) => void) {
  const q: TreeNode<T>[] = [...nodes]
  while (q.length) {
    const n = q.shift()!
    visit(n)
    for (const c of n.children) q.push(c)
  }
}

export function findNode<T>(nodes: TreeNode<T>[], id: string): TreeNode<T> | null {
  let found: TreeNode<T> | null = null
  dfs(nodes, (n) => { if (n.id === id) found = n })
  return found
}

