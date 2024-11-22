export type Account = {
  id: string,
  clientName: string,
  email: string,
  status: string,
  country: string,
  creationDate: string,
  moduleIds?: string[],
  address?: string,
  contactPersonName?: string,
  phoneNumber?: string,
  description?: string,
  logoUrl?: string,
}
