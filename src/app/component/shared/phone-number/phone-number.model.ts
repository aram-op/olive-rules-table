export class PhoneNumber {
  countryCode: string
  number: string

  constructor(countryCode: string, number: string) {
    this.countryCode = countryCode,
      this.number = number
  }
}
