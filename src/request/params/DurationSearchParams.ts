export class DurationSearchParams {
    userId: string;
    date: number;
    constructor (userId: string, date: number) {
      this.userId = userId
      this.date = date
    }
}
