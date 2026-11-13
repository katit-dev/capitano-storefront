export type PageMark = { type: string; attrs?: { href?: string; target?: string } };
export type PageNode = { type: string; text?: string; attrs?: { level?: number; start?: number; type?: string }; marks?: PageMark[]; content?: PageNode[] };
export type PageContent = { text: string; version?: number; doc?: PageNode };
