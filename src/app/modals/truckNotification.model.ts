export class TruckNotification{

    constructor(
        public carModel: string,
        public body: string,
        public volume: string,
        public capasity: string,
        public from: string,
        public to: string,
        public date: string,
        public bet: string,
        public executor: string,
        public executorId: string
      ) {  }
}