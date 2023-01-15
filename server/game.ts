import { FingerprintResult } from "express-fingerprint/lib/types";

export default class Game {
    players: Map<string, Player> = new Map();
    
    join(hash: string) {
        if(this.players.has(hash)) return this.players.get(hash)!.id;
        
        if(this.players.size == 4) return -1;
        
        this.players.set(hash, new Player(hash, this.players.size));

        return this.players.size - 1;
    }
    constructor(hash: string) {
        
    }
}

class Player {
    constructor(public hash: string, public id: number) {
        
    }
}