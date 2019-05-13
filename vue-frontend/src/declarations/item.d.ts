export as namespace ExWM

export interface EntryItem {
  headline: string,
  body: string,
  uuid: string,
  timestamp: string,
  upvotes: number,
  downvotes: number,
  keywords: string[],
}
