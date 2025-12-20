import express from 'express'
import{ LoginPasswordGenerationWithAI, ProductGenerationWithAI} from '../Controllers/AIGenerations.js';

const AIRouters = express.Router();

AIRouters.post('/generate' ,  ProductGenerationWithAI)
AIRouters.post('/logingeneration' , LoginPasswordGenerationWithAI)

export default AIRouters;