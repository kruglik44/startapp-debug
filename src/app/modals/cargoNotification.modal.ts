export class CargoNotification{

    constructor(
        public cargo: string,
        public body: string,
        public volume: string,
        public capasity: string,
        public from: string,
        public to: string,
        public date: string,
        public bet: string,
        public sender: string,
        public senderId: string
      ) {  }
}