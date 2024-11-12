export type Rule = {
  id: string,
  name: string,
  module: string,
  country: string,
  countryImgUrl: string,
  status: string,
  leaveIds: string[]
};

export function isRule(obj: any): obj is Rule {
  return obj && typeof obj.module === 'string';
}
