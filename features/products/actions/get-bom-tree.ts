"use server"

import { api } from "@/lib/api"
import type { BomTreeNode } from "../types"

export async function getBomTree(
  productId: string,
  revisionId: string
): Promise<BomTreeNode> {
  return api<BomTreeNode>(
    `/api/products/${productId}/revisions/${revisionId}/bom-tree`
  )
}
