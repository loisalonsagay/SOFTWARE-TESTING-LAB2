import {prisma} from '../routes'
import createServer from '../utils/server'
import supertest from 'supertest'

const app = createServer();

describe("Champion", () => {    
    describe("show all champions", () => {
        describe("given a couple of champions exist in the database", () =>{
            it("should return all champions", async () => {
               //setup
               await prisma.champion.createMany({
                data:[
                    {
                        name: "Teemo",
                        baseHealth: 598,
                        baseMana: 334,
                        healthRegen: 5.5,
                        manaRegen: 9.6
                    },
                    {
                        name: "Smolder",
                        baseHealth: 575,
                        baseMana: 300,
                        healthRegen: 3,
                        manaRegen: 8.5
                    }
                ]
               })

               //invocation
               const res = await supertest(app).get("/api/champions");

               //assessment
               expect(res.statusCode).toBe(200);
               expect(res.body.length).toBe(2); //since we expect there'll be 2 champs.

               //teardown
               await prisma.champion.deleteMany(); //delete your newly inserted data.

            })
        })
    })
})