import {ObjectId} from "bson";

export interface PersonalDetails {
    _id?: ObjectId
    belongsToExperiment: ObjectId
    age: number
    gender:string// Radio button
    education:string// Radio button
    howDecided:string// open question
    attention:number// Scale Industries <-> Portfolio . 0  means totally full attention to portfolio.
    didCount:boolean// Radio button
    didWrite:boolean// Radio button
    familiarityWithStocks:number// Scale 0-100
    whatIsStock:string// open question
    whatIsPortfolio:string// open question
    didParticipateBefore:boolean// Radio button
    didCheckMarkAppeared:boolean// Radio button
    comments?:string// open question
}