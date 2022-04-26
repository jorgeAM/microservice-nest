export class Video {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly duration: number,
    readonly creatorId: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {}
}
