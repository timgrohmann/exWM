export as namespace ExWM

export interface EntryItem {
  headline: string,
  body: string,
  uuid: string,
  timestamp: string,
  upvoters: string[],
  downvoters: string[],
  keyword: string[],
}
