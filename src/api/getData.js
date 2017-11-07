/**
 * Created by sdergt on 2017/11/7.
 */
import axios from 'axios';
let base = '../../static/workSeting.json';
//egg
// export const getWorksetingList = params => axios.get(`${base}`,{params:params});

// export const getWorksetingList = params => axios.post(`${base}`,params);

export const getWorksetingList = params => axios.get(`${base}`);
