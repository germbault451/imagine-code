import { Router } from 'express';
import http from 'http';
import { wrap } from '../util';

const dataRouter = Router();




dataRouter.get('/data', wrap(async (_req, res) => {
    const urlData = {
        host: 'https://wordpress.jplambert.devwebgarneau.com',
        path: '/wp-json/wp/v2/posts',
        method: 'GET'
    };
    const datax = await http.get(urlData, (resx) => { return resx; });
    console.log(datax);
    return res.send(datax);
}));



export { dataRouter };
