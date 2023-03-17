import { compare, hash } from "bcryptjs";

// deepcode ignore HardcodedSecret: this is number of round, not fixed salt
const ROUND = 12

/* 一開始唔儲低密碼 ，而家hash一次個密碼 */
export function hashPassword(password: string): Promise<string> {
    return hash(password, ROUND)
}

/* Check password有冇錯，compare係對比 */
export function comparePassword(options:{
    password: string
    password_hash: string
}): Promise<boolean> {
    return compare(options.password, options.password_hash)
}